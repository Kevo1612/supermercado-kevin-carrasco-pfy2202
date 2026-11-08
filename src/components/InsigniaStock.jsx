export default function InsigniaStock({ stock }) {
  const estilo =
    stock === 0 ? 'bg-red-100 text-red-700'
    : stock <= 5 ? 'bg-amber-100 text-amber-700'
    : 'bg-emerald-100 text-emerald-700'
  const texto = stock === 0 ? 'Sin stock' : `Stock: ${stock}`
  return <span className={`w-fit rounded-full px-2 py-0.5 text-xs font-medium ${estilo}`}>{texto}</span>
}
