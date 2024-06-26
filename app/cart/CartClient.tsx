"use client";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/Heading";
import Button from "../components/Button";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/utils/formatPrice";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface CartClientProps {
  currentUser: SafeUser | null;
}

const CartClient: React.FC<CartClientProps> = ({ currentUser }) => {
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();

  const router = useRouter();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Seu carrinho está vazio!</div>
        
        <div>
          <Link
            href={"/"}
            className="
          text-slate-500 flex items-center gap-1
          mt-2
          "
          >
            <MdArrowBack />
            <span>Ver Produtos</span>
          </Link>
        </div>
        <Image
            width={650}
            height={650}
            src="/emtycart.png"
            alt="Carrinho vazio"
          />
      </div>
    );
  }

  return (
    <div>
      <Heading title="Carrinho De Compras" center />
      <div
        className="grid
      grid-cols-5
      text-xs
      gap-4
      pb-2
      items-center
      mt-12
      "
      >
        <div className="col-span-2 justify-self-start font-semibold">PRODUTOS</div>
        <div className="justify-self-center font-semibold">PREÇO</div>
        <div className="justify-self-center font-semibold">QUANTIDADE</div>
        <div className="justify-self-end font-semibold">TOTAL</div>
      </div>
      <div>
        {cartProducts &&
          cartProducts.map((item) => {
            return <ItemContent key={item.id} item={item} />;
          })}
      </div>
      <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
        <div className="w-[90px]">
          <Button
            label="Limpar"
            onClick={() => {
              handleClearCart();
            }}
            small
            outline
          />
        </div>
        <div className="text-sm flex flex-col gap-3 items-start mt-5">
          <div className="flex justify-between w-full text-base font-semibold">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotalAmount)}</span>
          </div>
          <p className="text-slate-500">
            Impostos e frete calculados na finalização da compra
          </p>
          <Button
            label={currentUser ? "Confira" : "Login Para Finalizar"}
            outline={currentUser ? false : true}
            onClick={() => {
              currentUser ? router.push("/checkout") : router.push("/login");
            }}
          />
          <Link
            href={"/"}
            className="
          text-slate-500 flex items-center gap-1
          mt-2
          "
          >
            <MdArrowBack />
            <span>Continue comprando</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
