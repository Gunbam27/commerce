export default function PromoBanner() {
  return (
    <div className="w-full h-8 bg-black flex items-center justify-center">
        <div className="relative w-[1240px] flex items-center justify-center">
            <p className="text-white text-sm">Sign up and get 20% off your first order.&nbsp;</p>
            <a href="#" className="text-white text-sm underline cursor-pointer">Sign Up Now</a>
        <button className="absolute right-10 text-white text-sm cursor-pointer">X</button>
        </div>
    </div>
  );
}