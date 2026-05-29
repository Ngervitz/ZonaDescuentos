export default function ClientFound({ client }) {
  return (
    <div className="clientBanner clientBanner--found">
      <strong>Te encontramos en nuestro sistema</strong>
      <span>{client.name}</span>
    </div>
  );
}
