import ShopRequest from "@/components/shop-request";

export default function Home() {
  return (
    <div className="flex flex-col items-center space-y-2.5 py-2.5 px-1.5">
      <h1 className="text-lg font-bold">Welcome!</h1>
      <ShopRequest />
    </div>
  );
}
