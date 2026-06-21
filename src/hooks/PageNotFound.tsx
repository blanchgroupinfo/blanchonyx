import { useLocation } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export default function PageNotFound({}) {
  const location = useLocation();
  const pageName = location.pathname.substring(1);

  const { data: authData, isFetched } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const { data } = await supabase.auth.getUser();
        return { user: data.user, isAuthenticated: !!data.user };
      } catch {
        return { user: null, isAuthenticated: false };
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="max-w-md w-full">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-7xl font-light text-slate-300">404</h1>
            <div className="h-0.5 w-16 bg-slate-200 mx-auto"></div>
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-medium text-slate-800">
              Page Not Found
            </h2>
            <p className="text-slate-600 leading-relaxed">
              The page{" "}
              <span className="font-medium text-slate-700">
                &quot;{pageName}&quot;
              </span>{" "}
              could not be found in this application.
            </p>
          </div>
          {isFetched && authData.isAuthenticated && authData.user?.role === "admin" && (
            <div className="mt-8 p-4 bg-slate-100 rounded-lg border border-slate-200">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                </div>
                <div className="text-left space-y-1">
                  <p className="text-sm font-medium text-slate-700">Admin Note</p>
                  <p className="text-xs text-slate-500">
                    The requested route does not match any defined routes in the application.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
