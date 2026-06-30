REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
COMMENT ON POLICY "Anyone can submit an application" ON public.membership_applications IS 'Intentional: the membership application form is publicly accessible. Reads are restricted to admins and the applicant.';
