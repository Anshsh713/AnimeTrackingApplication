import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useAnimeList } from "../../Context/AnimeListContext";

import ProfileBanner from "./sections/ProfileBanner";
import ProfileStats from "./sections/ProfileStats";
import FavoriteAnime from "./sections/FavoriteAnime";
import Achievements from "./sections/Achievements";
import ActivityTimeline from "./sections/ActivityTimeline";
import ChartsSection from "./sections/ChartsSection";
import EditProfile from "./EditProfile";

import "./Profile.css";

export default function ProfilePage() {
  // Access logged-in user info
  const { user } = useAuth();

  // All anime list history of user
  const { animeList } = useAnimeList();

  // Controls the Edit Profile popup
  const [editOpen, setEditOpen] = useState(false);

  // If user is not loaded yet, show a loading screen
  if (!user) {
    return (
      <div className="profile-page loading-center">
        <h2>Loading Profile...</h2>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* Profile Banner Section (Header) */}
      <ProfileBanner onEdit={() => setEditOpen(true)} />

      {/* Main content container */}
      <div className="profile-body">
        <ProfileStats animeList={animeList} />
        <FavoriteAnime animeList={animeList} />
        <Achievements animeList={animeList} />
        <ActivityTimeline animeList={animeList} />
        <ChartsSection animeList={animeList} />
      </div>

      {/* Edit Profile Popup */}
      {editOpen && <EditProfile onClose={() => setEditOpen(false)} />}
    </div>
  );
}
