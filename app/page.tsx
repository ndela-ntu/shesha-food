import ShopRequest from "@/components/shop-request";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-2.5">
      <h1 className="text-lg font-bold">Welcome!</h1>
      <ShopRequest />
    </div>
  );
}
