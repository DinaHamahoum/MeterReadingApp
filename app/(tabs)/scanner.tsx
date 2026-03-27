import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraOpen, setCameraOpen] = useState(false);

  // Pas encore de réponse sur la permission
  if (!permission) {
    return <View style={styles.center}><Text>Chargement...</Text></View>;
  }

  // Permission refusée
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Ionicons name="camera-outline" size={48} color="gray" />
        <Text style={styles.permText}>Accès à la caméra refusé</Text>
        <TouchableOpacity style={styles.btn} onPress={requestPermission}>
          <Text style={styles.btnText}>Autoriser la caméra</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Caméra ouverte
  if (cameraOpen) {
    return (
      <View style={styles.container}>
        <CameraView style={styles.camera} facing="back">
          {/* Cadre de scan */}
          <View style={styles.overlay}>
            <View style={styles.frame} />
            <Text style={styles.hint}>Pointez vers le code-barres</Text>
          </View>
        </CameraView>

        {/* Bouton fermer */}
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => setCameraOpen(false)}
        >
          <Ionicons name="close" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }

  // Écran principal
  return (
    <View style={styles.center}>
      <Ionicons name="barcode-outline" size={64} color="#1A56CC" />
      <Text style={styles.title}>Scanner</Text>
      <Text style={styles.sub}>Ouvrez la caméra pour scanner un code-barres</Text>

      <TouchableOpacity style={styles.btn} onPress={() => setCameraOpen(true)}>
        <Ionicons name="camera-outline" size={20} color="#fff" />
        <Text style={styles.btnText}>Ouvrir la caméra</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  center: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#F9FAFB', padding: 24, gap: 12,
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  sub: { fontSize: 14, color: 'gray', textAlign: 'center' },
  permText: { fontSize: 16, fontWeight: '600', color: 'gray', textAlign: 'center' },

  btn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#1A56CC', borderRadius: 12,
    paddingVertical: 14, paddingHorizontal: 28, marginTop: 8,
  },
  btnText: { color: '#fff', fontSize: 15, fontWeight: '700' },

  camera: { flex: 1 },
  overlay: {
    flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20,
  },
  frame: {
    width: 250, height: 100,
    borderWidth: 2, borderColor: '#1A56CC',
    borderRadius: 8, backgroundColor: 'transparent',
  },
  hint: { color: '#fff', fontSize: 14, fontWeight: '600' },

  closeBtn: {
    position: 'absolute', top: 52, right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20, padding: 8,
  },
});