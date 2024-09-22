import ThreeScene from "@/components/threeScene";
import Sidebar from "@/components/sidebar";
import Image from "next/image";
import SettingsPanel from '@/app/imageto3d/settingsPanel'

export default function Home() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>

      <div style={{ width: '250px', backgroundColor: '#f0f0f0' }}>
        <Sidebar></Sidebar>
      </div>
      <div style={{ flex: 1 }}>
        <ThreeScene></ThreeScene>
      </div>

      {/* Settings Panel */}
      <div style={{ width: '300px', backgroundColor: '#f0f0f0'}}>
        <SettingsPanel />
      </div>
    </div>
  );
}
