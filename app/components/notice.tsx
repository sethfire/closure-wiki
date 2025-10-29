export default function Notice({ title, message, color = "#22BBFF" }: {
  title: string;
  message: string;
  color?: string;
}) {
  return (
    <div 
      className="border-l-4 pl-4 py-1 bg-muted/50 rounded"
      style={{ borderColor: color }}
    >
      <p className="font-semibold text-base mb-1">{title}</p>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}