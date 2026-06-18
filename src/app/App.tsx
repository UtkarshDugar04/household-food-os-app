import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import MobileLayout from './components/layout/MobileLayout';
import { useTheme } from './hooks/useTheme';

import Welcome from './pages/Onboarding/Welcome';
import HouseholdSetup from './pages/Onboarding/HouseholdSetup';
import DietarySetup from './pages/Onboarding/DietarySetup';
import NutritionGoals from './pages/Onboarding/NutritionGoals';
import InitialScan from './pages/Onboarding/InitialScan';
import ShoppingSources from './pages/Onboarding/ShoppingSources';
import InventoryConfirmation from './pages/Onboarding/InventoryConfirmation';
import HomeDashboard from './pages/Home/HomeDashboard';
import DailyInsights from './pages/Home/DailyInsights';
import ImpactDashboard from './pages/Home/ImpactDashboard';
import PantryOverview from './pages/Pantry/PantryOverview';
import InventoryList from './pages/Pantry/InventoryList';
import ExpiryTimeline from './pages/Pantry/ExpiryTimeline';
import AddInventory from './pages/Pantry/AddInventory';
import PlannerDashboard from './pages/Planner/PlannerDashboard';
import WeeklyPlanGeneration from './pages/Planner/WeeklyPlanGeneration';
import DayDetail from './pages/Planner/DayDetail';
import CommunityHome from './pages/Community/CommunityHome';
import MapView from './pages/Community/MapView';
import ListingDetail from './pages/Community/ListingDetail';
import TrustProfile from './pages/Community/TrustProfile';
import ProfileDashboard from './pages/Profile/ProfileDashboard';
import Settings from './pages/Profile/Settings';
import RestockDashboard from './pages/Shopping/RestockDashboard';
import PurchaseRecommendations from './pages/Shopping/PurchaseRecommendations';
import ShoppingListBuilder from './pages/Shopping/ShoppingListBuilder';
import CartComparison from './pages/Shopping/CartComparison';
import ChatHome from './pages/AI/ChatHome';
import RecipeDetail from './pages/Recommendations/RecipeDetail';
import CookMode from './pages/Recommendations/CookMode';
import FeedbackLoops from './pages/Recommendations/FeedbackLoops';
import ConflictResolution from './pages/EdgeCases/ConflictResolution';
import UnknownIngredient from './pages/EdgeCases/UnknownIngredient';
import MissingIngredients from './pages/EdgeCases/MissingIngredients';

// New Imports for the remaining 34 screens
import TodayRecommendationDetail from './pages/Home/TodayRecommendationDetail';
import ExpiryCenter from './pages/Home/ExpiryCenter';
import ShoppingSignals from './pages/Home/ShoppingSignals';
import Notifications from './pages/Home/Notifications';

import ItemDetail from './pages/Pantry/ItemDetail';
import CategoryView from './pages/Pantry/CategoryView';
import PhotoScan from './pages/Pantry/PhotoScan';
import ReceiptScan from './pages/Pantry/ReceiptScan';
import VoiceAdd from './pages/Pantry/VoiceAdd';
import OrderImport from './pages/Pantry/OrderImport';
import InventoryReview from './pages/Pantry/InventoryReview';
import InventoryHistory from './pages/Pantry/InventoryHistory';

import MealGenerator from './pages/Recommendations/MealGenerator';
import RecommendationStack from './pages/Recommendations/RecommendationStack';

import WeekView from './pages/Planner/WeekView';
import EditMeal from './pages/Planner/EditMeal';
import NutritionAnalysis from './pages/Planner/NutritionAnalysis';

import ShoppingListGeneration from './pages/Shopping/ShoppingListGeneration';
import PurchaseCompletion from './pages/Shopping/PurchaseCompletion';

import CreateListing from './pages/Community/CreateListing';
import ExchangeFlow from './pages/Community/ExchangeFlow';
import CommunityHistory from './pages/Community/CommunityHistory';

import HouseholdProfile from './pages/Profile/HouseholdProfile';
import DietaryProfile from './pages/Profile/DietaryProfile';
import NutritionGoalsSettings from './pages/Profile/NutritionGoalsSettings';
import ShoppingPreferences from './pages/Profile/ShoppingPreferences';
import HouseholdInsights from './pages/Profile/HouseholdInsights';

import InventoryQA from './pages/AI/InventoryQA';
import NutritionCoach from './pages/AI/NutritionCoach';

import LowConfidenceInventory from './pages/EdgeCases/LowConfidenceInventory';
import MultiUserConflict from './pages/EdgeCases/MultiUserConflict';
import ExpiredItemConfirmation from './pages/EdgeCases/ExpiredItemConfirmation';
import RecipeIngredientMissing from './pages/EdgeCases/RecipeIngredientMissing';
import NoRecipeAvailable from './pages/EdgeCases/NoRecipeAvailable';
import NoCommunityMatch from './pages/EdgeCases/NoCommunityMatch';
import ConflictingGoals from './pages/EdgeCases/ConflictingGoals';
import EmptyPantryState from './pages/EdgeCases/EmptyPantryState';

// Placeholder Pages
const DesignSystem = () => <div className="p-4 text-center mt-10">Design System</div>;

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { theme, setTheme } = useTheme();

  return (
    <HashRouter>
      <Routes>
        <Route element={<MobileLayout />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomeDashboard />} />
          <Route path="/home/insights" element={<DailyInsights />} />
          <Route path="/home/impact" element={<ImpactDashboard />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/pantry" element={<PantryOverview />} />
          <Route path="/pantry/list" element={<InventoryList />} />
          <Route path="/pantry/expiry" element={<ExpiryTimeline />} />
          <Route path="/pantry/add" element={<AddInventory />} />
          <Route path="/planner" element={<PlannerDashboard />} />
          <Route path="/planner/generate" element={<WeeklyPlanGeneration />} />
          <Route path="/planner/day" element={<DayDetail />} />
          <Route path="/community" element={<CommunityHome />} />
          <Route path="/community/map" element={<MapView />} />
          <Route path="/community/listing" element={<ListingDetail />} />
          <Route path="/community/trust" element={<TrustProfile />} />
          <Route path="/profile" element={<ProfileDashboard />} />
          <Route path="/profile/settings" element={<Settings />} />
          
          <Route path="/shopping/restock" element={<RestockDashboard />} />
          <Route path="/shopping/recommendations" element={<PurchaseRecommendations />} />
          <Route path="/shopping/list" element={<ShoppingListBuilder />} />
          <Route path="/shopping/compare" element={<CartComparison />} />
          
          {/* Flows without bottom navigation */}
          <Route path="/home/recommendation" element={<TodayRecommendationDetail />} />
          <Route path="/home/expiry-center" element={<ExpiryCenter />} />
          <Route path="/home/shopping-signals" element={<ShoppingSignals />} />
          
          <Route path="/pantry/item" element={<ItemDetail />} />
          <Route path="/pantry/category" element={<CategoryView />} />
          <Route path="/pantry/photo" element={<PhotoScan />} />
          <Route path="/pantry/receipt" element={<ReceiptScan />} />
          <Route path="/pantry/voice" element={<VoiceAdd />} />
          <Route path="/pantry/import" element={<OrderImport />} />
          <Route path="/pantry/review" element={<InventoryReview />} />
          <Route path="/pantry/history" element={<InventoryHistory />} />

          <Route path="/recommendations/generate" element={<MealGenerator />} />
          <Route path="/recommendations/stack" element={<RecommendationStack />} />

          <Route path="/planner/week" element={<WeekView />} />
          <Route path="/planner/edit" element={<EditMeal />} />
          <Route path="/planner/nutrition" element={<NutritionAnalysis />} />

          <Route path="/shopping/generate" element={<ShoppingListGeneration />} />
          <Route path="/shopping/complete" element={<PurchaseCompletion />} />

          <Route path="/community/create" element={<CreateListing />} />
          <Route path="/community/exchange" element={<ExchangeFlow />} />
          <Route path="/community/history" element={<CommunityHistory />} />

          <Route path="/profile/household" element={<HouseholdProfile />} />
          <Route path="/profile/dietary" element={<DietaryProfile />} />
          <Route path="/profile/goals" element={<NutritionGoalsSettings />} />
          <Route path="/profile/shopping" element={<ShoppingPreferences />} />
          <Route path="/profile/insights" element={<HouseholdInsights />} />

          <Route path="/ai/qa" element={<InventoryQA />} />
          <Route path="/ai/coach" element={<NutritionCoach />} />

          <Route path="/edge/low-confidence" element={<LowConfidenceInventory />} />
          <Route path="/edge/multi-user" element={<MultiUserConflict />} />
          <Route path="/edge/expired-confirm" element={<ExpiredItemConfirmation />} />
          <Route path="/edge/recipe-missing" element={<RecipeIngredientMissing />} />
          <Route path="/edge/no-recipe" element={<NoRecipeAvailable />} />
          <Route path="/edge/no-community" element={<NoCommunityMatch />} />
          <Route path="/edge/conflict-goals" element={<ConflictingGoals />} />
          <Route path="/edge/empty-pantry" element={<EmptyPantryState />} />

          <Route path="/ai-chat" element={<ChatHome />} />
          <Route path="/recipe" element={<RecipeDetail />} />
          <Route path="/recipe/cook" element={<CookMode />} />
          <Route path="/recipe/feedback" element={<FeedbackLoops />} />
          <Route path="/conflict" element={<ConflictResolution />} />
          <Route path="/unknown-ingredient" element={<UnknownIngredient />} />
          <Route path="/missing-ingredients" element={<MissingIngredients />} />
          <Route path="/onboarding/welcome" element={<Welcome />} />
          <Route path="/onboarding/household" element={<HouseholdSetup />} />
          <Route path="/onboarding/dietary" element={<DietarySetup />} />
          <Route path="/onboarding/goals" element={<NutritionGoals />} />
          <Route path="/onboarding/sources" element={<ShoppingSources />} />
          <Route path="/onboarding/scan" element={<InitialScan />} />
          <Route path="/onboarding/confirmation" element={<InventoryConfirmation />} />
          <Route path="/design-system" element={<DesignSystem />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
