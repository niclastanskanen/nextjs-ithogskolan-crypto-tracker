import CryptoDetails from "./CryptoDetails";
import CryptoList from "./CryptoList";
import FavoritesList from "./FavoritesList";
import Header from "./Header";
import SearchBar from "./SearchBar";

const CryptoPriceTracker = () => {
  return (
    <div className="container mx-auto p-4">
      <Header />
      <SearchBar />
      <CryptoList />
      <CryptoDetails />
      <FavoritesList />
    </div>
  );
};

export default CryptoPriceTracker;
