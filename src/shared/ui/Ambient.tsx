/* Brilhos azuis bem suaves atrás da página: dão profundidade sem competir com o conteúdo */
export default function Ambient() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-[15%] top-[5%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(0,102,214,0.10)_0%,transparent_65%)] blur-3xl" />
      <div className="absolute -right-[10%] top-[45%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(61,139,255,0.06)_0%,transparent_65%)] blur-3xl" />
    </div>
  );
}
