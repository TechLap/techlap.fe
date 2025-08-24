interface BadgeProps {
    content: string;
    color?: string;
}

const Badge = ({ content, color = "bg-gray-100 text-gray-800" }: BadgeProps) => {
    return (
        <span className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium ${color}`}>{content}</span>
    )
}

export default Badge;