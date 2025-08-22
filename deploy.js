#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Iniciando despliegue de TaTeTi...\n');

// Verificar que estamos en el directorio correcto
if (!fs.existsSync('package.json')) {
  console.error('❌ Error: No se encontró package.json. Asegúrate de estar en el directorio del proyecto.');
  process.exit(1);
}

try {
  // Paso 1: Instalar dependencias
  console.log('📦 Instalando dependencias...');
  execSync('npm install', { stdio: 'inherit' });
  
  // Paso 2: Construir el proyecto
  console.log('\n🔨 Construyendo proyecto para producción...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Paso 3: Verificar que la construcción fue exitosa
  if (!fs.existsSync('build')) {
    console.error('❌ Error: La carpeta build no se creó. Revisa los errores de construcción.');
    process.exit(1);
  }
  
  console.log('\n✅ ¡Construcción exitosa!');
  console.log('\n📋 Próximos pasos para desplegar:');
  console.log('\n1️⃣ Vercel (Recomendado):');
  console.log('   - Ve a https://vercel.com');
  console.log('   - Regístrate con GitHub');
  console.log('   - Importa tu repositorio');
  console.log('   - ¡Listo! Tu juego estará online');
  
  console.log('\n2️⃣ Netlify:');
  console.log('   - Ve a https://netlify.com');
  console.log('   - Regístrate con GitHub');
  console.log('   - Arrastra la carpeta "build" al área de deploy');
  console.log('   - ¡Tu juego estará online!');
  
  console.log('\n3️⃣ GitHub Pages:');
  console.log('   - Ejecuta: npm install --save-dev gh-pages');
  console.log('   - Modifica package.json con la configuración de GitHub Pages');
  console.log('   - Ejecuta: npm run deploy');
  
  console.log('\n🎯 Para promocionar tu juego:');
  console.log('   - Comparte en redes sociales con #gaming #react');
  console.log('   - Publica en Reddit r/webdev y r/reactjs');
  console.log('   - Escribe un artículo en Dev.to o Medium');
  console.log('   - Agrega Google Analytics para monitorear visitantes');
  
  console.log('\n🎉 ¡Tu TaTeTi está listo para conquistar el mundo! 🌍');
  
} catch (error) {
  console.error('\n❌ Error durante el despliegue:', error.message);
  process.exit(1);
}
