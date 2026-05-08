interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  price: number;
  discount: number;
  image: string;
  stock: number;
  status: "rejected" | "stock" | "accepted";
  rating: number;
  views: number;
  sales: number;
  decisionDate: string;
  rejectionReason: string;
  range: number;
}

function ProductCard({
  name,
  brand,
  price,
  discount,
  image,
  stock,
  status,
  rating,
  views,
  sales,
  decisionDate,
  rejectionReason,
  range,
}: ProductCardProps) {
  const statusLabel = status === "accepted" ? "Approved" : status === "rejected" ? "Rejected" : "Stock";

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="aspect-[4/3] bg-gray-100">
        <img src={image} alt={name} className="h-full w-full object-cover" />
      </div>
      <div className="space-y-3 p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{brand}</p>
          <h3 className="mt-1 line-clamp-1 text-base font-bold text-gray-900">{name}</h3>
        </div>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-lg font-bold text-gray-900">₹{price.toLocaleString("en-IN")}</p>
            {discount > 0 && <p className="text-xs text-emerald-600">{discount}% discount</p>}
          </div>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">{statusLabel}</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
          <span>Stock {stock}</span>
          <span>{range} km</span>
          <span>{rating} ★</span>
        </div>
        <div className="flex justify-between border-t border-gray-100 pt-3 text-xs text-gray-500">
          <span>{views} views</span>
          <span>{sales} sales</span>
        </div>
        {decisionDate && <p className="text-xs text-gray-400">Decision: {decisionDate}</p>}
        {status === "rejected" && rejectionReason && (
          <p className="rounded-xl bg-red-50 p-2 text-xs text-red-600">{rejectionReason}</p>
        )}
      </div>
    </article>
  );
}

export default ProductCard;
