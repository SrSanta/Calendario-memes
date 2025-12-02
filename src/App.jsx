import React, { useState, useEffect } from 'react';
import { Lock, Gift, X, Snowflake, Calendar } from 'lucide-react';

// --- DATOS CON IMÁGENES REALES (CORREGIDAS V3) ---
const MEME_DATA = [
  { day: 1, title: "GTA VI", img: "https://i.blogs.es/1ca280/trailer-1-illustration-16x9-/1200_900.jpg?auto=format&fit=crop&w=800&q=80", text: "Yo esperando a que GTA VI termine de instalarse (van 3 dias)" },
  { day: 2, title: "Por el megabox", img: "https://www.reasonwhy.es/media/cache/destacada/kfc-megabox-cinco.jpg?auto=format&fit=crop&w=800&q=80", text: "No te puedes aguantar la rima" },
  { day: 3, title: "Neuralink", img: "https://s1.abcstatics.com/abc/www/multimedia/ciencia/2024/01/30/neuralink-musk-kjvC-U52510742812PVn-1200x840@abc.jpg?auto=format&fit=crop&w=800&q=80", text: "Cuando se te olvida pagar el Premium de tu chip cerebral" },
  { day: 4, title: "iPhone 17 Air", img: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80", text: "iPhone 17: Ahora sin pantalla, solo vibra y cuesta 2000€" },
  { day: 5, title: "Robot Camarero", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80", text: "El robot camarero pidiendome propina del 30%" },
  { day: 6, title: "Clima 2025", img: "https://static.eldiario.es/clip/45f44cbf-81bd-4a3f-9e28-9ccbce0c7d7c_16-9-discover-aspect-ratio_default_1126556.jpg?auto=format&fit=crop&w=800&q=80", text: "Diciembre en España: *30 grados a la sombra*" },
  { day: 7, title: "Shrek 5 Hype", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRZr7W-qmIPefYnVvD-vFH4Z_Lit8PY_GhRQ&s?auto=format&fit=crop&w=800&q=80", text: "La boda real del año: Burro y la Dragona en 4K" },
  { day: 8, title: "Inflación", img: "https://img.freepik.com/foto-gratis/retrato-hombre-sonriente-confiado-gafas-sol_171337-9745.jpg?semt=ais_hybrid&w=740&q=80?auto=format&fit=crop&w=800&q=80", text: "Pov: Te encuentras 1 euro y te compras media aceituna" },
  { day: 9, title: "Disney Live Action", img: "https://i.ytimg.com/vi/AgWGA6Ol_4g/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBD8HMVhY4RvMHyeg9ft314C_HHMg?auto=format&fit=crop&w=800&q=80", text: "Nadie: Disney: Live Action de la pelicula de Up" },
  { day: 10, title: "ChatGPT-6", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80", text: "Mi IA escribiendo mi TFG mientras yo duermo" },
  { day: 11, title: "Gafas VR", img: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80", text: "Yo en el metro con las Apple Vision peleando con el aire" },
  { day: 12, title: "Netflix Bloqueo", img: "https://images.unsplash.com/photo-1585647347384-2593bc35786b?auto=format&fit=crop&w=800&q=80", text: "Netflix 2025: Escanea tu ADN para ver Betty la Fea" },
  { day: 13, title: "Crypto Bro", img: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=800&q=80", text: "Bitcoin bajo a 1$ -> *5 min despues* -> Bitcoin en 1.000.000$" },
  { day: 14, title: "Coches Voladores", img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80", text: "2025 y seguimos sin coches voladores, pero tenemos patinetes explosivos" },
  { day: 15, title: "Gen Alpha Boss", img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80", text: "Mi jefe del 2010 diciendome: 'Ese informe es muy Skibidi Rizz'" },
  { day: 16, title: "Super Bowl", img: "https://phantom-marca-mx.unidadeditorial.es/38cf083036797650ff2d8da01b812ede/resize/828/f/jpg/mx/assets/multimedia/imagenes/2024/02/10/17075836402152.jpg?auto=format&fit=crop&w=800&q=80", text: "Taylor Swift llega al partido en cohete de SpaceX" },
  { day: 17, title: "Nintendo Switch 2", img: "https://i.etsystatic.com/36267511/r/il/eb6c5c/6536363096/il_340x270.6536363096_np29.jpg?auto=format&fit=crop&w=800&q=80", text: "Sale la Switch 2... Los juegos costando 90€" },
  { day: 18, title: "Viaje a Marte", img: "https://fotografias.lasexta.com/clipping/cmsimages02/2024/06/05/7526BEF2-8BC3-4E2F-90AF-D466127D7FB6/imagen-archivo-varios-candados-llaves-edificio-apartamentos-turisticos-centro-malaga_160.jpg?crop=6000,3375,x0,y317&width=544&height=306&optimize=low&format=webply?auto=format&fit=crop&w=800&q=80", text: "Elon Musk: Quien quiere ir a Marte? Yo: Se paga alquiler?" },
  { day: 19, title: "Gym IA", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80", text: "Mi entrenador personal es una IA y me juzga por comer pan" },
  { day: 20, title: "Moda 2025", img: "https://fotografias.antena3.com/clipping/cmsimages01/2022/08/06/76295C99-BE18-4786-AC3F-3D5994FB59A5/bolso-trash-pouch-balenciaga-hecho-viral-similitud-bolsa-basura_96.jpg?crop=1020,574,x4,y0&width=1200&height=675&optimize=low&format=webply?auto=format&fit=crop&w=800&q=80", text: "Balenciaga vende bolsa de basura edición limitada por 5000€" },
  { day: 21, title: "Nostalgia 2020", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80", text: "Que tiempos aquellos del Game Pass, Fornite y GTA V..." },
  { day: 22, title: "Avatar 3", img: "https://images.unsplash.com/photo-1560674457-12073ed6fae6?auto=format&fit=crop&w=800&q=80", text: "Viendo Avatar 3: Dura 9 horas y no fui al baño" },
  { day: 23, title: "Fin del Mundo", img: "https://images.unsplash.com/photo-1451186859696-371d9477be93?auto=format&fit=crop&w=800&q=80", text: "Noticias: Asteroide se acerca. Yo: Ojala caiga antes del lunes" },
  { day: 24, title: "Sobrevivimos", img: "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?auto=format&fit=crop&w=800&q=80", text: "Logro Desbloqueado: Sobrevivir al 2025" },
];

export default function MemeAdventCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [openedDoors, setOpenedDoors] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [cheatMode, setCheatMode] = useState(false);
  
  // Estados para IA
  const [isOracleOpen, setIsOracleOpen] = useState(false);
  const [oracleInput, setOracleInput] = useState("");
  const [oracleResponse, setOracleResponse] = useState("");
  const [isOracleLoading, setIsOracleLoading] = useState(false);
  
  const [roastResponse, setRoastResponse] = useState("");
  const [isRoastLoading, setIsRoastLoading] = useState(false);

  useEffect(() => {
    // Inicialización
  }, []);

  const handleDoorClick = (day) => {
    const today = currentDate.getDate();
    const currentMonth = currentDate.getMonth(); 
    
    const isLocked = !cheatMode && (currentMonth !== 11 || day > today);

    if (isLocked) return;

    if (!openedDoors.includes(day)) {
      setOpenedDoors([...openedDoors, day]);
    }
    
    // Limpiar roast anterior al abrir nuevo meme
    setRoastResponse(""); 
    const meme = MEME_DATA.find(m => m.day === day);
    setSelectedMeme(meme);
  };

  const isDoorLocked = (day) => {
    const today = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    if (currentMonth !== 11 && !cheatMode) return true;
    return !cheatMode && day > today;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-red-500 selection:text-white pb-24">
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900 via-slate-900 to-black"></div>

      <div className="relative max-w-6xl mx-auto px-4 py-8">
        
        {/* Header */}
        <header className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-red-600 rounded-full shadow-lg shadow-red-900/50 mb-4 animate-bounce">
            <Snowflake className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-200 to-red-400 tracking-tight">
            Adviento de Memes 2025
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Una dosis diaria de humor para sobrevivir hasta Navidad. 
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 text-sm bg-slate-800/50 p-4 rounded-2xl backdrop-blur-sm border border-slate-700 w-fit mx-auto">
            <div className="flex items-center gap-2 text-slate-300">
              <Calendar size={16} />
              <span>Hoy: <span className="font-bold text-white">{currentDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}</span></span>
            </div>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <div className="relative">
                <input type="checkbox" className="sr-only peer" checked={cheatMode} onChange={() => setCheatMode(!cheatMode)} />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </div>
              <span className="text-slate-300">Modo Impaciente</span>
            </label>
          </div>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {MEME_DATA.map((item) => {
            const locked = isDoorLocked(item.day);
            const opened = openedDoors.includes(item.day);

            return (
              <button
                key={item.day}
                onClick={() => handleDoorClick(item.day)}
                disabled={locked}
                className={`
                  group relative aspect-[4/5] rounded-xl transition-all duration-300 transform perspective-1000 overflow-hidden
                  ${locked 
                    ? 'bg-slate-800 border-2 border-slate-700 opacity-75 cursor-not-allowed hover:bg-slate-750' 
                    : opened 
                      ? 'border-2 border-green-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                      : 'border-2 border-red-500 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] cursor-pointer'
                  }
                `}
              >
                {/* Fondo de Imagen (Solo visible si está abierto o en hover si no está bloqueado) */}
                <div 
                  className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 
                    ${opened ? 'opacity-100' : 'opacity-0'}
                  `}
                  style={{ backgroundImage: `url(${item.img})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                </div>

                {/* Fondo rojo por defecto (tapa la imagen si no está abierto) */}
                <div className={`absolute inset-0 bg-gradient-to-br from-red-600 to-red-900 transition-opacity duration-500 ${opened ? 'opacity-0' : 'opacity-100'}`}></div>

                {/* Contenido Frontal */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 z-10">
                  <span className={`text-4xl md:text-5xl font-black mb-2 transition-colors drop-shadow-lg ${locked ? 'text-slate-600' : 'text-white'}`}>
                    {item.day}
                  </span>
                  
                  <div className="mt-2">
                    {locked ? (
                      <Lock className="w-6 h-6 text-slate-600" />
                    ) : opened ? (
                       // Si está abierto, mostramos el título pequeño
                       <span className="text-xs font-bold text-center block text-white/90 line-clamp-2">{item.title}</span>
                    ) : (
                      <Gift className="w-8 h-8 text-yellow-300 animate-pulse group-hover:scale-110 transition-transform" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* --- MODAL DEL MEME --- */}
      {selectedMeme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-800/50 shrink-0">
              <h3 className="text-xl font-bold text-white">Día {selectedMeme.day}: {selectedMeme.title}</h3>
              <button onClick={() => setSelectedMeme(null)} className="p-2 bg-slate-700 hover:bg-slate-600 rounded-full text-white"><X size={20} /></button>
            </div>

            {/* IMAGEN DEL MEME */}
            <div className="relative p-0 bg-black flex items-center justify-center min-h-[300px] shrink-0 overflow-hidden group">
              {/* Imagen de fondo */}
              <img 
                src={selectedMeme.img} 
                alt={`Meme día ${selectedMeme.day}`} 
                className="w-full h-full object-cover absolute inset-0 opacity-60 group-hover:scale-105 transition-transform duration-700" 
              />
              {/* Gradiente para legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30"></div>
              
              {/* TEXTO DEL MEME (Estilo Impact clásico o moderno) */}
              <div className="relative z-10 p-6 text-center">
                 <p className="text-2xl md:text-3xl font-black text-white font-impact uppercase tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] leading-tight" style={{ textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>
                    {selectedMeme.text}
                 </p>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 -z-10" onClick={() => setSelectedMeme(null)}></div>
        </div>
      )}
    </div>
  );
}