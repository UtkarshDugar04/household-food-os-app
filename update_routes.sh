#!/bin/bash
cd "src/app/pages"
find Profile -type f -name "*.tsx" -exec sed -i '' 's/backRoute=""/backRoute="\/profile"/g' {} +
find AI -type f -name "*.tsx" -exec sed -i '' 's/backRoute=""/backRoute="\/home"/g' {} +
find Community -type f -name "*.tsx" -exec sed -i '' 's/backRoute=""/backRoute="\/community"/g' {} +
find Planner -type f -name "*.tsx" -exec sed -i '' 's/backRoute=""/backRoute="\/planner"/g' {} +
find Shopping -type f -name "*.tsx" -exec sed -i '' 's/backRoute=""/backRoute="\/shopping\/restock"/g' {} +
find Home -type f -name "*.tsx" -exec sed -i '' 's/backRoute=""/backRoute="\/home"/g' {} +
find Recommendations -type f -name "*.tsx" -exec sed -i '' 's/backRoute=""/backRoute="\/home"/g' {} +
find Pantry -type f -name "*.tsx" -exec sed -i '' 's/backRoute=""/backRoute="\/pantry"/g' {} +
find EdgeCases -type f -name "*.tsx" -exec sed -i '' 's/backRoute=""/backRoute="\/home"/g' {} +
echo "Done"
