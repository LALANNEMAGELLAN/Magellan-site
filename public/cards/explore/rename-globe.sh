#!/bin/bash
# Script pour renommer les fichiers inspirations en globe

if [ -f "inspirations-de-voyages-front.png" ]; then
  mv "inspirations-de-voyages-front.png" "globe.png"
  echo "✅ inspirations-de-voyages-front.png → globe.png"
else
  echo "⚠️  inspirations-de-voyages-front.png non trouvé"
fi

if [ -f "inspirations-de-voyages-back.png" ]; then
  mv "inspirations-de-voyages-back.png" "globe-back.png"
  echo "✅ inspirations-de-voyages-back.png → globe-back.png"
else
  echo "⚠️  inspirations-de-voyages-back.png non trouvé"
fi

echo ""
echo "📋 Fichiers dans le dossier :"
ls -la *.png 2>/dev/null | grep -E "globe|map|lightbulb"
