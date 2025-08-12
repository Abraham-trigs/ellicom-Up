export default function SuperadminPage() {
  return (
    <>
      {/* This now ONLY handles page-specific content */}
      <section className="space-y-4 ">
        <h1 className="text-2xl font-bold">Welcome, Superadmin</h1>
        <p className="text-textSecondary">
          Here&apos;s your dashboard overview.
        </p>

        {/* Put your stats, charts, tables, etc here */}
      </section>
    </>
  );
}
