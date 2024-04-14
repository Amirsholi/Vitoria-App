"use client";

import { formatPrice } from "@/utils/formatPrice";
import { CartProductType } from "../product/[productId]/ProductDetails";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";

interface ItemContentProps {
  item: CartProductType;
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const { handleRemoveProductFromCart } = useCart();
  return (
    <div
      className="
  grid
  grid-cols-5
  text-xs
  md:text-sm
  gap-4
  border-t-[1.5px]
  border-slate-200
  py-4
  items-center
  "
    >
      <div
        className="
      col-span-2
      justify-self-start
      flex
      gap-2
      md:gap-4
      "
      >
        <Link href={`/product/${item.id}`}>
          <div className="relative w-[70px] aspect-square">
            <Image
              src={item.selectedImg.image}
              alt={item.name}
              fill
              className="object-contain"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between">
        <Link className="text-xl" href={`/product/${item.id}`}>{item.name}</Link>
          <div className="w-[70px]">
            <button
              className="text-red-400 underline"
              onClick={() => handleRemoveProductFromCart(item)}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(item.price)}</div>
      <div className="justify-self-center">
        <p>{item.quantity}</p>
      </div>
      <div className="justify-self-end font-semibold">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default ItemContent;
