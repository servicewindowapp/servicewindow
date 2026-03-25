// Generic avatar upload utility for ServiceWindow dashboards
// Uses Cloudflare R2 for photo storage via presigned URLs
// Usage: uploadProfileAvatar(event, userRole, tableName)
// Example: <input type="file" onchange="uploadProfileAvatar(event, 'service_provider', 'profiles')">

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
    // Step 1: Request presigned URL from Edge Function
    const { uploadUrl, publicUrl } = await getPresignedUploadUrl(
      filename,
      file.type
    );

    if (!uploadUrl) {
      throw new Error('Failed to get upload URL');
    }

    // Step 2: Upload directly to R2 using presigned URL
    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    });

    if (!uploadResponse.ok) {
      throw new Error(`R2 upload failed: ${uploadResponse.statusText}`);
    }

    // Step 3: Save public URL to database
    const { error: dbError } = await window.supabase
      .from(tableName)
      .update({ avatar_url: publicUrl })
      .eq('id', user.id);

    if (dbError) throw dbError;

    // Step 4: Display uploaded image
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

// Helper function to get presigned upload URL from Edge Function
async function getPresignedUploadUrl(filename, contentType) {
  try {
    const response = await fetch(
      'https://krmfxedkxoyzkeqnijcd.supabase.co/functions/v1/get-upload-url',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await window.supabase.auth.getSession()).data.session?.access_token || ''}`,
        },
        body: JSON.stringify({
          filename,
          contentType,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Edge Function error: ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    console.error('Error getting presigned URL:', err);
    throw err;
  }
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
