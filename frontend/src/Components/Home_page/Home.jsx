import AllAnime from "../AllAnime/AllAnime";
import NewsList from "../News/NewsList";
import MyStatsPage from "../Stats/MyStatsPage";
import TopThreeSection from "../TopThreeSection/TopThreeSection";
import FeaturedSlider from "../SlidingWindow/FeaturedSlider";

import "./Home.css";

export default function Home() {
  return (
    <div className="home-wrapper">
      {/* Left Column – Featured slider + anime list + news */}
      <div className="home-left">
        <FeaturedSlider />
        <AllAnime />
        <NewsList />
      </div>

      {/* Right Column – Stats + Top 3 list */}
      <div className="home-right">
        <MyStatsPage />
        <TopThreeSection />
      </div>
    </div>
  );
}
