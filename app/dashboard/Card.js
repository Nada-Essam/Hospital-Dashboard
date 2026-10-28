export default function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2>{title}</h2>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}