export function getInitials(name: string | undefined) {
    const names = name?.split(" ");
    const initials = names?.map(n => n[0]).join("");
    return initials?.slice(0, 2).toUpperCase();
  }