export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50 w-full h-full">
      <div className="w-16 h-16 rounded-full animate-spin border-8 border-solid border-primary-foreground border-t-transparent shadow-md"></div>
    </div>
  );
}
