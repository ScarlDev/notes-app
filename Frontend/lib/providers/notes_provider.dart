import 'package:flutter/foundation.dart';
import '../core/api_client.dart';
import '../core/constants.dart';
import '../models/note.dart';

class NotesProvider with ChangeNotifier {
  final ApiClient _apiClient = ApiClient();
  
  List<Note> _notes = [];
  bool _isLoading = false;
  String? _errorMessage;

  List<Note> get notes => _notes;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  Future<void> fetchNotes() async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      final response = await _apiClient.dio.get(AppConstants.notesEndpoint);
      _notes = (response.data as List)
          .map((note) => Note.fromJson(note))
          .toList();
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _errorMessage = e.toString();
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<bool> createNote(String title, String content) async {
    _errorMessage = null;
    
    try {
      final response = await _apiClient.dio.post(
        AppConstants.notesEndpoint,
        data: {
          'title': title,
          'content': content,
        },
      );

      final newNote = Note.fromJson(response.data);
      _notes.insert(0, newNote);
      notifyListeners();
      return true;
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
      return false;
    }
  }

  Future<bool> deleteNote(String noteId) async {
    _errorMessage = null;
    
    try {
      await _apiClient.dio.delete('${AppConstants.notesEndpoint}/$noteId');
      _notes.removeWhere((note) => note.id == noteId);
      notifyListeners();
      return true;
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
      return false;
    }
  }
}
