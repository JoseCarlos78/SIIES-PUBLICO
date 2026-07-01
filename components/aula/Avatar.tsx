import type { User } from "@/lib/aula/types";

function initials(name: string): string {
  return name
    .replace(/^Prof\.\s*/i, "")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function Avatar({
  user,
  size = "md",
}: {
  user: Pick<User, "name" | "avatar">;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm";
  return (
    <span
      className={`flex items-center justify-center rounded-full font-bold text-white ${user.avatar} ${dim}`}
      aria-hidden
    >
      {initials(user.name)}
    </span>
  );
}
