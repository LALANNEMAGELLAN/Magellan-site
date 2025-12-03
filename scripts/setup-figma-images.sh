#!/bin/bash

# Script pour aider à placer et renommer les images Figma

echo "🔧 Configuration des images Figma"
echo ""

# Dossier de destination
EXPLORE_DIR="public/cards/explore"
SHARE_DIR="public/cards/share"
REMEMBER_DIR="public/cards/remember"

# Créer les dossiers s'ils n'existent pas
mkdir -p "$EXPLORE_DIR" "$SHARE_DIR" "$REMEMBER_DIR"

echo "📁 Dossiers créés/vérifiés :"
echo "   - $EXPLORE_DIR"
echo "   - $SHARE_DIR"
echo "   - $REMEMBER_DIR"
echo ""

# Vérifier si des fichiers existent déjà
echo "🔍 Fichiers trouvés dans les dossiers :"
echo ""
echo "Explore:"
ls -1 "$EXPLORE_DIR"/*.png 2>/dev/null || echo "   (aucun fichier PNG)"
echo ""
echo "Share:"
ls -1 "$SHARE_DIR"/*.png 2>/dev/null || echo "   (aucun fichier PNG)"
echo ""
echo "Remember:"
ls -1 "$REMEMBER_DIR"/*.png 2>/dev/null || echo "   (aucun fichier PNG)"
echo ""

echo "📝 Instructions :"
echo "1. Exportez vos images depuis Figma"
echo "2. Placez-les dans les dossiers correspondants"
echo "3. Renommez-les selon le mapping :"
echo ""
echo "   Section Explore :"
echo "   - map.png (Carte interactive dynamique)"
echo "   - lightbulb.png (Découvertes autour de vous)"
echo "   - globe.png (Inspirations de voyages)"
echo ""
echo "   Section Share :"
echo "   - folder.png (Album collaboratif)"
echo "   - chat.png (Chat intégré)"
echo "   - share.png (Partage instantané)"
echo ""
echo "   Section Remember :"
echo "   - folder.png (Souvenirs regroupés)"
echo "   - sparkles.png (Récit IA)"
echo "   - chart.png (Statistiques)"
echo ""












