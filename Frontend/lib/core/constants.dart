class AppConstants {
  // IMPORTANTE: Usa la IP local de tu computadora, no localhost
  // Para obtener tu IP: ejecuta en terminal -> hostname -I | awk '{print $1}'
  // Asegúrate de que el celular y la computadora estén en la misma red WiFi
  static const String baseUrl = 'http://192.168.18.63:3000/api';
  static const String authEndpoint = '/auth';
  static const String notesEndpoint = '/notes';
  
  static const String tokenKey = 'auth_token';
}
