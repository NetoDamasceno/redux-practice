export function getAvatarColor(name) {
  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = hash % 360;

  return `hsl(${hue}, 60%, 50%)`;
}

export function getInitial(name) {
  return name?.charAt(0).toUpperCase();
}
