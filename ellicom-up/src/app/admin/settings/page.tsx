// app/admin/settings/page.tsx

export default function SettingsPage() {
  return (
    <div className="min-h-screen px-6 py-10 bg-white text-gray-900">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <p className="text-gray-600 mb-8">
          Manage admin preferences, platform configuration, and internal
          toggles.
        </p>

        <div className="grid gap-6">
          <div className="p-6 border rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-2">General</h2>
            <p className="text-sm text-gray-500">
              Company name, logo, and appearance settings.
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Permissions</h2>
            <p className="text-sm text-gray-500">
              Control access for admins, staff, and clients.
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Notifications</h2>
            <p className="text-sm text-gray-500">
              Manage alerts, emails, and activity logs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
