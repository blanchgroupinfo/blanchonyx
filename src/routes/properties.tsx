import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/properties")({
  component: PropertyPage,
});

function PropertyPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("properties")
      .select("name, price, metadata")
      .eq("status", "available")
      .then(({ data, error }) => {
        if (!error && data) setProperties(data);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Available Properties</h1>
      {loading ? (
        <p>Loading...</p>
      ) : properties.length === 0 ? (
        <p>No properties available at the moment.</p>
      ) : (
        <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
          {properties.map((property, index) => (
            <div key={index} style={{ border: "1px solid #ccc", padding: "16px", borderRadius: "8px" }}>
              <h3>{property.name}</h3>
              <p>Price: ${property.price}</p>
              {property.metadata && <small>Location: {property.metadata.location || "N/A"}</small>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
