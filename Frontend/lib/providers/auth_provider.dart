import 'package:flutter/foundation.dart';
import '../core/api_client.dart';
import '../core/constants.dart';
import '../models/user.dart';

class AuthProvider with ChangeNotifier {
  final ApiClient _apiClient = ApiClient();
  
  User? _user;
  bool _isAuthenticated = false;
  bool _isLoading = false;
  String? _errorMessage;

  User? get user => _user;
  bool get isAuthenticated => _isAuthenticated;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  // Constructor: verificar estado de autenticación automáticamente
  AuthProvider() {
    _initializeAuthStatus();
  }

  // Inicializar el estado de autenticación al crear el provider
  Future<void> _initializeAuthStatus() async {
    try {
      final token = await _apiClient.getToken();
      _isAuthenticated = token != null;
      if (kDebugMode) {
        print('AuthProvider: Initial auth status = $_isAuthenticated');
      }
      notifyListeners();
    } catch (e) {
      if (kDebugMode) {
        print('AuthProvider: Error checking initial auth status: $e');
      }
      _isAuthenticated = false;
      notifyListeners();
    }
  }

  Future<void> checkAuthStatus() async {
    try {
      final token = await _apiClient.getToken();
      _isAuthenticated = token != null;
      notifyListeners();
    } catch (e) {
      if (kDebugMode) {
        print('AuthProvider: Error checking auth status: $e');
      }
      _isAuthenticated = false;
      notifyListeners();
    }
  }

  Future<bool> login(String email, String password) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      if (kDebugMode) {
        print('AuthProvider: Attempting login for $email');
      }
      
      final response = await _apiClient.dio.post(
        '${AppConstants.authEndpoint}/login',
        data: {
          'email': email,
          'password': password,
        },
      );

      if (kDebugMode) {
        print('AuthProvider: Login successful');
      }

      _user = User.fromJson(response.data['user']);
      await _apiClient.saveToken(response.data['token']);
      _isAuthenticated = true;
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      if (kDebugMode) {
        print('AuthProvider: Login failed - $e');
      }
      _errorMessage = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<bool> register(String email, String password, String name) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      final response = await _apiClient.dio.post(
        '${AppConstants.authEndpoint}/register',
        data: {
          'email': email,
          'password': password,
          'name': name,
        },
      );

      _user = User.fromJson(response.data['user']);
      await _apiClient.saveToken(response.data['token']);
      _isAuthenticated = true;
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _errorMessage = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<void> logout() async {
    await _apiClient.deleteToken();
    _user = null;
    _isAuthenticated = false;
    notifyListeners();
  }
}
