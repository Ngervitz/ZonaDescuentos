import { Bell } from "lucide-react";

export default function NotQualifiedBlock() {
  return (
    <section className="notQualifiedBlock">
      <div className="notQualifiedBlockInner">
        <div className="notQualifiedIcon" aria-hidden="true">
          <Bell size={22} strokeWidth={2} />
        </div>
        <div className="notQualifiedCopy">
          <h2>¿Y si no califico hoy?</h2>
          <p>
            Si hoy no calificás, podemos avisarte cuando aparezcan nuevas oportunidades o
            productos más adecuados para tu perfil.
          </p>
          <button
            type="button"
            className="btnNotify"
            onClick={() => {
              // TODO: connect to re-engagement flow
            }}
          >
            Quiero que me avisen
          </button>
        </div>
      </div>
    </section>
  );
}
