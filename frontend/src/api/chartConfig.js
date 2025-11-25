// Import required Chart.js modules
import {
  Chart as ChartJS, // Core Chart.js object
  ArcElement, // For Pie / Doughnut charts
  BarElement, // For Bar charts
  CategoryScale, // X-axis categories
  LinearScale, // Y-axis numeric scale
  Tooltip, // Hover tooltips
  Legend, // Chart legends
} from "chart.js";

// Register modules so Chart.js can use them
ChartJS.register(
  ArcElement, // Enables Pie / Doughnut chart rendering
  BarElement, // Enables Bar chart rendering
  CategoryScale, // Enables category-based axis
  LinearScale, // Enables numeric axis
  Tooltip, // Enables tooltip display
  Legend // Enables legend display
);
