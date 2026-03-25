// Generic avatar upload utility for ServiceWindow dashboards
// Uses Cloudflare R2 for photo storage via Cloudflare Worker proxy
// Usage: uploadProfileAvatar(event, userRole, tableName)
// Example: <input type="file" onchange="uploadProfileAvatar(event, 'service_provider', 'profiles')">
// Worker URL should be set in R2_UPLOAD_WORKER_URL constant below

const R2_UPLOAD_WORKER_URL = 'https://r2-upload.servicewindow.workers.dev';

async function uploadProfileAvatar(event, userRole, tableName = 'profiles') {
  const file = event.target.files[0];
  if (!file || !window.supabase) return;

  // Validate file type
  if (!file.type.startsWith('image/')) {
    showToast('Please upload an image file.', 'error');
    event.target.value = '';
    return;
  }

  const { data: { user } } = await window.supabase.auth.getUser();
  if (!user) {
    showToast('Please sign in first.', 'error');
    event.target.value = '';
    return;
  }

  const ext = file.name.split('.').pop();
  const filename = `${userRole}/${user.id}.${ext}`;

  try {
    // Step 1: Upload directly to R2 via Cloudflare Worker
    const uploadUrl = new URL(R2_UPLOAD_WORKER_URL);
    uploadUrl.searchParams.set('filename', filename);
    uploadUrl.searchParams.set('contentType', file.type);

    const uploadResponse = await fetch(uploadUrl.toString(), {
      method: 'POST',
      body: file,
    });

    if (!uploadResponse.ok) {
      throw new Error(`Upload failed: ${uploadResponse.statusText}`);
    }

    const uploadResult = await uploadResponse.json();
    if (!uploadResult.success || !uploadResult.url) {
      throw new Error('Upload returned invalid response');
    }

    const publicUrl = uploadResult.url;

    // Step 2: Save public URL to database
    const { error: dbError } = await window.supabase
      .from(tableName)
      .update({ avatar_url: publicUrl })
      .eq('id', user.id);

    if (dbError) throw dbError;

    // Step 3: Display uploaded image
    const avatarElement = event.target.closest('[data-avatar-container]')?.querySelector('[data-avatar-image]');
    if (avatarElement) {
      avatarElement.innerHTML = '';
      const img = document.createElement('img');
      img.src = publicUrl + '?t=' + Date.now();
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      img.alt = 'Profile avatar';
      avatarElement.appendChild(img);
    }

    showToast('Photo uploaded successfully!', 'success');
  } catch (err) {
    console.error('Avatar upload error:', err);
    showToast('Failed to upload photo: ' + err.message, 'error');
  }

  // Reset file input
  event.target.value = '';
}

// Helper function to display avatar from URL or initials
function displayAvatar(element, avatarUrl, initials) {
  if (!element) return;

  if (avatarUrl) {
    element.innerHTML = '';
    const img = document.createElement('img');
    img.src = avatarUrl;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    element.appendChild(img);
  } else {
    element.textContent = initials || 'U';
  }
}
