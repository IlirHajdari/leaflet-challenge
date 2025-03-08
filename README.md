# Earthquake Visualization Dashboard

## NOTE

The starter code for this assignment was provided by the course/class, which is why I continued using the existing project structure and built upon it.

## Description

This project creates an **interactive map** to visualize **earthquake data** from the USGS GeoJSON feed. Using **Leaflet.js**, the dashboard plots earthquakes based on their geographical coordinates, providing insights into their magnitude and depth.

## Summary

### Part 1: Data Retrieval and Map Setup

The first step involved fetching **JSON data** from the USGS earthquake dataset and rendering it on an interactive map.

#### Key Deliverables:

- Load data from the **USGS GeoJSON Feed** using **D3.js**.
- Extract relevant earthquake details (latitude, longitude, magnitude, and depth).
- Initialize a Leaflet.js map centered on a predefined location.

### Part 2: Data Visualization

Markers were plotted to represent each earthquake, with visual elements conveying additional information.

#### **Markers Representation**

- **Size:** Reflects the **magnitude** of the earthquake (larger for higher magnitudes).
- **Color:** Represents the **depth** of the earthquake (darker for greater depths).
- **Popups:** Display additional earthquake details (location, magnitude, depth, time).

### Part 3: Legend and Interactivity

A **legend** and interactive elements enhance the usability of the map.

#### Key Deliverables:

- Create a **legend** explaining marker colors and sizes.
- Implement **interactive popups** to display earthquake details.
- Ensure real-time updates by fetching live USGS data.

## Deployment

The completed earthquake visualization was deployed using **GitHub Pages**.
You can view the live map here:  
[Live Earthquake Map](https://ilirhajdari.github.io/leaflet-challenge/)

## Requirements

### Tools and Libraries

**Frontend:**

- HTML
- CSS
- JavaScript

**Libraries:**

- Leaflet.js
- D3.js
- Bootstrap

## Contact Information

For questions or additional information, reach out to me at:

- **Email:** ilir.hajdari111@gmail.com
