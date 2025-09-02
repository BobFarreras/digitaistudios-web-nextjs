import {Hammer, Building2, Home} from 'lucide-react';


// -------------------- OLD WEBSITE --------------------
const OldConstructionWebsite = () => (
    <div className="w-full min-h-[700px] bg-white text-gray-900 font-sans border rounded-lg overflow-hidden shadow-lg">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-4 flex justify-between items-center shadow">
        <h1 className="text-lg font-bold">Construccions Martínez</h1>
        <nav className="space-x-4 text-sm">
          <a href="#">Inici</a>
          <a href="#">Serveis</a>
          <a href="#">Projectes</a>
          <a href="#">Contacte</a>
        </nav>
      </header>
  
      {/* Hero */}
      <div className="h-56 relative">
        <img
          src="https://ik.imagekit.io/uol7aqk8z/DigitAI%20Studios/istockphoto-147205632-612x612.jpg?updatedAt=1756199420945"
          alt="Construcció antiga"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
          <h2 className="text-2xl font-bold">La teva obra en bones mans</h2>
        </div>
      </div>
  
      {/* Serveis */}
      <main className="p-6 grid md:grid-cols-3 gap-6">
        {[
          { icon: Home, title: "Obra nova", desc: "Construcció de vivendes i edificis." },
          { icon: Building2, title: "Reformes", desc: "Millora i adaptació d’espais antics." },
          { icon: Hammer, title: "Manteniment", desc: "Serveis generals i reparacions." },
        ].map((s) => (
          <div key={s.title} className="bg-gray-100 border p-4 text-center hover:bg-gray-200">
            <s.icon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-bold">{s.title}</h3>
            <p className="text-sm mt-2">{s.desc}</p>
          </div>
        ))}
      </main>
  
      {/* Contacte */}
      <section className="p-6 border-t">
        <h3 className="font-bold mb-2">Contacta amb nosaltres</h3>
        <form className="space-y-2 text-sm">
          <input type="text" placeholder="Nom" className="w-full border p-2" />
          <input type="email" placeholder="Correu electrònic" className="w-full border p-2" />
          <textarea placeholder="Missatge..." className="w-full border p-2" rows={3} />
          <button className="bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-500">
            Enviar
          </button>
        </form>
      </section>
  
      {/* Footer */}
      <footer className="bg-gray-200 text-gray-600 text-xs text-center p-3">
        © 2014 Construccions Martínez
      </footer>
    </div>
  );

  export default OldConstructionWebsite;