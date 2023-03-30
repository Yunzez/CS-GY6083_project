import { useRouter } from 'next/router';

const UserSettings: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 h-screen bg-gray-100 p-4">
        <h2 className="font-semibold mb-4">User Settings</h2>
        <ul className="space-y-2">
          <li
            className="cursor-pointer"
            onClick={() => router.push('/settings/payment-history')}
          >
            Payment History
          </li>
          <li
            className="cursor-pointer"
            onClick={() => router.push('/settings/parking-history')}
          >
            Parking History
          </li>
          <li
            className="cursor-pointer"
            onClick={() => router.push('/settings/shows-visited')}
          >
            Shows Visited
          </li>
          <li
            className="cursor-pointer"
            onClick={() => router.push('/settings/shops-visited')}
          >
            Shops Visited
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 h-screen bg-white p-4">
        {/* Main content goes here */}
      </div>
    </div>
  );
};

export default UserSettings;