// Generic avatar upload utility for ServiceWindow dashboards
// Usage: uploadProfileAvatar(event, userRole, tableName)
// Example: <input type="file" onchange="uploadProfileAvatar(event, 'service_provider', 'profiles')">

async function uploadProfileAvatar(event, userRole, tableName = 'profiles') {
  const file = event.target.files[0];
  if (!file || !window.supabase) return;

  const { data: { user } } = await window.supabase.auth.getUser();
  if (!user) {
    showToast('Please sign in first.', 'error');
    return;
  }

  const ext = file.name.split('.').pop();
  const filePath = `${userRole}/${user.id}.${ext}`;

  try {
    // Upload to storage
    const { error: uploadError } = await window.supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data } = window.supabase.storage.from('avatars').getPublicUrl(filePath);
    const avatarUrl = data?.publicUrl;

    // Update profiles table with avatar URL
    await window.supabase.from(tableName).update({ avatar_url: avatarUrl }).eq('id', user.id);

    // Display uploaded image
    const avatarElement = event.target.closest('[data-avatar-container]')?.querySelector('[data-avatar-image]');
    if (avatarElement) {
      avatarElement.innerHTML = '';
      const img = document.createElement('img');
      img.src = avatarUrl + '?t=' + Date.now();
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
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
