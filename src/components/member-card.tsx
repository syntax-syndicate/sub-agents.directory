import Link from "next/link";

interface MemberCardProps {
  member: {
    username: string;
    name: string | null;
    avatarUrl: string | null;
    _count: {
      generations: number;
    };
  };
}

export function MemberCard({ member }: MemberCardProps) {
  return (
    <Link
      href={`/u/${member.username}`}
      className="flex border border-border p-2 items-center gap-2 group"
    >
      {member.avatarUrl ? (
        <img
          src={member.avatarUrl}
          alt={member.name || member.username}
          className="w-10 h-10 rounded-sm grayscale group-hover:grayscale-0 transition-all duration-300"
        />
      ) : (
        <div className="w-10 h-10 rounded-sm bg-muted flex items-center justify-center text-sm font-medium">
          {(member.name || member.username)[0].toUpperCase()}
        </div>
      )}
      <span className="text-xs text-[#878787] font-mono font-medium">
        {member.name || member.username}
      </span>
    </Link>
  );
}
