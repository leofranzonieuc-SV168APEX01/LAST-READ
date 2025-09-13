export default function SocialQR(){
  const persons=[
    { name:"Dan Batzozt", handle:"@batzozt", href:"https://www.instagram.com/batzozt?igsh=ZTJibXJ5bTZpOHpx", qr:"/qr/dan-batzozt.png" },
    { name:"Franzoni Léo", handle:"@leofranzonieuc", href:"https://www.instagram.com/leofranzonieuc?igsh=aHJrdnNkM2c3eDNh", qr:"/qr/leo-franzoni.png" },
    { name:"Hoodi", handle:"@hoodi971", href:"https://www.instagram.com/hoodi971?igsh=MW16Yjk5MzNjcGxscA==", qr:"/qr/hoodi.png" }
  ];
  return (
    <div className="grid sm:grid-cols-3 gap-6">
      {persons.map(p=>(
        <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="rounded-lg border p-4 hover:shadow text-center">
          <img src={p.qr} alt={`QR vers Instagram de ${p.name}`} className="w-full h-auto max-w-xs mx-auto rounded mb-3 bg-white p-2"/>
          <div className="font-semibold">{p.name}</div>
          <div className="text-sm text-gray-600">{p.handle}</div>
        </a>
      ))}
    </div>
  );
}
