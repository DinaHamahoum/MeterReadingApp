import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraOpen, setCameraOpen] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [numeroCompteur, setNumeroCompteur] = useState('');

  if (!permission) {
    return <View style={styles.center}><Text>Chargement...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.sub}>Accès caméra refusé</Text>
        <TouchableOpacity style={styles.btn} onPress={requestPermission}>
          <Text style={styles.btnText}>Autoriser</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleScan = ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);
    setNumeroCompteur(data);
    setCameraOpen(false);
  };

  if (cameraOpen) {
    return (
      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleScan}
          barcodeScannerSettings={{
            barcodeTypes: ['qr', 'code128', 'code39', 'ean13'],
          }}
        >
          <View style={styles.overlay}>
            <Text style={styles.hint}>Scannez le numéro de compteur</Text>
            <View style={styles.frame} />
          </View>
        </CameraView>

        <TouchableOpacity style={styles.closeBtn} onPress={() => setCameraOpen(false)}>
          <Ionicons name="close" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.center}>
      <Text style={styles.title}>Étape 1</Text>
      <Text style={styles.sub}>Scanner le numéro de compteur</Text>

      {numeroCompteur ? (
        <View style={styles.resultCard}>
          <Text style={styles.label}>NUMÉRO SCANNÉ ✅</Text>
          <Text style={styles.resultValue}>{numeroCompteur}</Text>
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.btn}
        onPress={() => { setScanned(false); setCameraOpen(true); }}
      >
        <Ionicons name="barcode-outline" size={20} color="#fff" />
        <Text style={styles.btnText}>
          {numeroCompteur ? 'Rescanner' : 'Scanner le compteur'}
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  center: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#F9FAFB', padding: 24, gap: 16,
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#111827' },
  sub: { fontSize: 14, color: 'gray', textAlign: 'center' },
  camera: { flex: 1 },
  overlay: {
    flex: 1, alignItems: 'center',
    justifyContent: 'center', gap: 20,
  },
  frame: {
    width: 250, height: 120,
    borderWidth: 2, borderColor: '#1A56CC', borderRadius: 8,
  },
  hint: {
    color: '#fff', fontSize: 14, fontWeight: '600',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
  },
  closeBtn: {
    position: 'absolute', top: 52, right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20, padding: 8,
  },
  resultCard: {
    backgroundColor: '#EBF2FF', borderRadius: 12,
    padding: 16, width: '100%', alignItems: 'center', gap: 6,
  },
  label: { fontSize: 11, fontWeight: '700', color: 'gray', letterSpacing: 1 },
  resultValue: { fontSize: 22, fontWeight: '800', color: '#1A56CC' },
  btn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#1A56CC', borderRadius: 12,
    paddingVertical: 14, paddingHorizontal: 32,
    width: '100%', justifyContent: 'center',
  },
  btnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});