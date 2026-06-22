import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import PageShell from "@/components/PageShell";

interface Property {
  name: string;
  price: number;
  metadata: any;
}

const PropertyPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("name, price, metadata")
        .eq("status", "available");
      if (error) {
        setError(error.message);
        console.error("Error fetching properties:", error);
      } else if (data) {
        setProperties(data as Property[]);
      }
      setLoading(false);
    };
    fetchProperties();
  }, []);

  return (
    <PageShell
      eyebrow="Properties"
      title={
        <> <span className="text-gradient-gold">Available Properties</span> </>
      }
      subtitle="Explore the available properties on the platform."
    >
      {loading && <p className="text-muted-foreground">Loading...</p>}
      {error && <p className="text-destructive">Error: {error}</p>}
      {!loading && !error && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => (
            <div key={p.name} className="card-sacred rounded-xl p-4">
              <h3 className="font-display text-lg text-foreground">{p.name}</h3>
              <p className="text-muted-foreground">Price: ${p.price}</p>
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
};

export const Route = createFileRoute("/property")({
  component: PropertyPage,
});

export default PropertyPage;
