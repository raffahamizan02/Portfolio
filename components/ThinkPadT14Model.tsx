'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';

function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number | number[]
) {
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(x, y, w, h, r);
  } else {
    const radius = typeof r === 'number' ? r : r[0] || 0;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }
}

function createKeyboardTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1414;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#161619';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.012)';
  for (let i = 0; i < 9000; i++) {
    const rx = Math.random() * canvas.width;
    const ry = Math.random() * canvas.height;
    ctx.fillRect(rx, ry, 1.5, 1.5);
  }

  const pwrX = 1880;
  const pwrY = 46;
  ctx.fillStyle = '#222226';
  ctx.beginPath();
  ctx.arc(pwrX, pwrY, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#2d2d34';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.strokeStyle = '#38d39f';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(pwrX, pwrY, 9, -Math.PI * 0.7, Math.PI * 0.7);
  ctx.stroke();

  ctx.fillStyle = '#0f0f12';
  for (let sx = 140; sx < 1740; sx += 12) {
    ctx.fillRect(sx, 44, 4, 3);
  }

  ctx.fillStyle = '#4a4a52';
  ctx.font = '600 13px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('DOLBY AUDIO', 140, 32);

  const kbX = 84;
  const kbY = 78;
  const kbW = 1880;
  const kbH = 690;

  ctx.fillStyle = '#0f0f12';
  ctx.beginPath();
  drawRoundRect(ctx, kbX, kbY, kbW, kbH, 12);
  ctx.fill();

  ctx.strokeStyle = '#08080a';
  ctx.lineWidth = 3;
  ctx.stroke();

  const rows = [
    ['Esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Home', 'End', 'Del'],
    ['~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
    ['CapsLk', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
    ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift', '▲'],
    ['Fn', 'Ctrl', 'Win', 'Alt', 'Space', 'AltGr', 'PrtSc', 'Ctrl', '◄', '▼', '►'],
  ];

  const rowY = [92, 196, 302, 408, 514, 620];
  const rowH = 88;

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  rows.forEach((rowKeys, rIdx) => {
    const y = rowY[rIdx];
    let curX = kbX + 20;

    rowKeys.forEach((key) => {
      let kw = 98;
      if (key === 'Backspace') kw = 175;
      else if (key === 'Tab') kw = 135;
      else if (key === '\\') kw = 145;
      else if (key === 'CapsLk') kw = 155;
      else if (key === 'Enter') kw = 190;
      else if (key === 'Shift') kw = rIdx === 4 && curX < 500 ? 198 : 178;
      else if (key === 'Space') kw = 540;
      else if (key === 'Ctrl' || key === 'Fn' || key === 'Win' || key === 'Alt' || key === 'AltGr' || key === 'PrtSc') kw = 94;
      else if (rIdx === 0) kw = 105;

      ctx.fillStyle = '#212124';
      ctx.beginPath();
      drawRoundRect(ctx, curX, y, kw, rowH, [6, 6, 10, 10]);
      ctx.fill();

      ctx.strokeStyle = '#2d2d33';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = key === 'Enter' ? '#f5f5fa' : '#c8c8d2';
      ctx.font = rIdx === 0
        ? '600 21px Inter, sans-serif'
        : key.length > 2
        ? '600 22px Inter, sans-serif'
        : 'bold 26px Inter, sans-serif';
      ctx.fillText(key, curX + kw / 2, y + rowH / 2);

      if (key === 'F' || key === 'J') {
        ctx.fillStyle = '#f0f0f5';
        ctx.fillRect(curX + kw / 2 - 12, y + rowH - 16, 24, 3);
      }

      if (key === 'Fn') {
        ctx.fillStyle = '#58a6ff';
        ctx.font = 'bold 22px Inter, sans-serif';
        ctx.fillText(key, curX + kw / 2, y + rowH / 2);
      }

      curX += kw + 10;
    });
  });

  const tpX = 1024;
  const tpY = 490;
  ctx.fillStyle = '#101012';
  ctx.beginPath();
  ctx.arc(tpX, tpY, 28, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#e01a22';
  ctx.beginPath();
  ctx.arc(tpX, tpY, 22, 0, Math.PI * 2);
  ctx.fill();

  const btnY = 800;
  const btnH = 92;
  const btnW = 195;
  const btnGap = 14;
  const totalBtnW = btnW * 3 + btnGap * 2;
  const btnStartX = (canvas.width - totalBtnW) / 2;

  ctx.fillStyle = '#202024';
  ctx.beginPath();
  drawRoundRect(ctx, btnStartX, btnY, btnW, btnH, [10, 10, 4, 4]);
  ctx.fill();
  ctx.strokeStyle = '#2c2c32';
  ctx.lineWidth = 2;
  ctx.stroke();

  const midX = btnStartX + btnW + btnGap;
  ctx.fillStyle = '#202024';
  ctx.beginPath();
  drawRoundRect(ctx, midX, btnY, btnW, btnH, [10, 10, 4, 4]);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#e01a22';
  ctx.beginPath();
  drawRoundRect(ctx, midX + 32, btnY + 40, btnW - 64, 8, 4);
  ctx.fill();

  ctx.fillStyle = '#e01a22';
  for (let gx = midX + 50; gx < midX + btnW - 50; gx += 16) {
    ctx.beginPath();
    ctx.arc(gx, btnY + 24, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  const rightX = midX + btnW + btnGap;
  ctx.fillStyle = '#202024';
  ctx.beginPath();
  drawRoundRect(ctx, rightX, btnY, btnW, btnH, [10, 10, 4, 4]);
  ctx.fill();
  ctx.stroke();

  const tpW = 640;
  const tpH = 410;
  const touchX = (canvas.width - tpW) / 2;
  const touchY = btnY + btnH + 20;

  ctx.fillStyle = '#1c1c1f';
  ctx.beginPath();
  drawRoundRect(ctx, touchX, touchY, tpW, tpH, 12);
  ctx.fill();
  ctx.strokeStyle = '#27272c';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.save();
  ctx.translate(canvas.width - 260, canvas.height - 140);
  ctx.rotate((-37 * Math.PI) / 180);

  ctx.font = 'bold 50px sans-serif';
  ctx.fillStyle = '#f0f0f4';
  ctx.textAlign = 'left';
  ctx.fillText('Think', 0, 0);

  ctx.font = '300 50px sans-serif';
  ctx.fillStyle = '#c5c5cb';
  ctx.fillText('Pad', 132, 0);

  ctx.fillStyle = '#ff1f30';
  ctx.beginPath();
  ctx.arc(94, -38, 7.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(255, 31, 48, 0.35)';
  ctx.beginPath();
  ctx.arc(94, -38, 14, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  const badgeX = 140;
  const badgeY = canvas.height - 150;
  ctx.fillStyle = '#103562';
  ctx.beginPath();
  drawRoundRect(ctx, badgeX, badgeY, 95, 85, 5);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('intel', badgeX + 47, badgeY + 34);
  ctx.font = '600 13px sans-serif';
  ctx.fillText('CORE i7', badgeX + 47, badgeY + 60);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

function createScreenTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1920;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#0d1117';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#161b22';
  ctx.fillRect(0, 0, canvas.width, 56);

  const controls = [
    { x: 32, col: '#ff5f56' },
    { x: 56, col: '#ffbd2e' },
    { x: 80, col: '#27c93f' },
  ];
  controls.forEach(({ x, col }) => {
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(x, 28, 7, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = '#0d1117';
  ctx.fillRect(130, 8, 230, 48);
  ctx.fillStyle = '#58a6ff';
  ctx.font = 'bold 18px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('TS server.ts', 155, 38);

  ctx.fillStyle = '#8b949e';
  ctx.font = '16px monospace';
  ctx.fillText('SQL schema.sql', 400, 38);
  ctx.fillText('YML docker-compose.yml', 640, 38);

  ctx.fillStyle = '#161b22';
  ctx.fillRect(0, 56, 60, canvas.height - 56);
  ctx.fillStyle = '#8b949e';
  ctx.font = '24px monospace';
  ctx.fillText('📁', 18, 105);
  ctx.fillText('🔍', 18, 160);
  ctx.fillText('🌿', 18, 215);

  const codeLines = [
    { num: '01', tokens: [{ text: "import", col: '#ff7b72' }, { text: " express, { Request, Response }", col: '#e6edf3' }, { text: " from", col: '#ff7b72' }, { text: " 'express';", col: '#a5d6ff' }] },
    { num: '02', tokens: [{ text: "import", col: '#ff7b72' }, { text: " { Pool }", col: '#e6edf3' }, { text: " from", col: '#ff7b72' }, { text: " 'pg';", col: '#a5d6ff' }] },
    { num: '03', tokens: [{ text: "", col: '#e6edf3' }] },
    { num: '04', tokens: [{ text: "const appName = 'Muhammad Abhiraffa Hamizan';", col: '#79c0ff' }] },
    { num: '05', tokens: [{ text: "const", col: '#ff7b72' }, { text: " app = express();", col: '#79c0ff' }] },
    { num: '06', tokens: [{ text: "const", col: '#ff7b72' }, { text: " pool = new Pool({ max: 20, idleTimeoutMillis: 30000 });", col: '#79c0ff' }] },
    { num: '07', tokens: [{ text: "", col: '#e6edf3' }] },
    { num: '08', tokens: [{ text: "app.get", col: '#d2a8ff' }, { text: "('/api/v1/system/health', ", col: '#a5d6ff' }, { text: "async", col: '#ff7b72' }, { text: " (req: Request, res: Response) => {", col: '#e6edf3' }] },
    { num: '09', tokens: [{ text: "    const", col: '#ff7b72' }, { text: " client = await pool.connect();", col: '#e6edf3' }] },
    { num: '10', tokens: [{ text: "    const", col: '#ff7b72' }, { text: " { rows } = await client.query('SELECT NOW() as uptime');", col: '#e6edf3' }] },
    { num: '11', tokens: [{ text: "    client.release();", col: '#79c0ff' }] },
    { num: '12', tokens: [{ text: "    return res.status(200).json({", col: '#e6edf3' }] },
    { num: '13', tokens: [{ text: "        status: 'online',", col: '#7ee787' }] },
    { num: '14', tokens: [{ text: "        engine: 'Node.js / Express',", col: '#7ee787' }] },
    { num: '15', tokens: [{ text: "        uptime: rows[0].uptime,", col: '#79c0ff' }] },
    { num: '16', tokens: [{ text: "        engineer: 'Muhammad Abhiraffa Hamizan',", col: '#7ee787' }] },
    { num: '17', tokens: [{ text: "    });", col: '#e6edf3' }] },
    { num: '18', tokens: [{ text: "});", col: '#e6edf3' }] },
    { num: '19', tokens: [{ text: "", col: '#e6edf3' }] },
    { num: '20', tokens: [{ text: "app.listen(3000, () => {", col: '#d2a8ff' }] },
    { num: '21', tokens: [{ text: "    console.log('[READY] Production Server online at port :3000');", col: '#a5d6ff' }] },
    { num: '22', tokens: [{ text: "});", col: '#e6edf3' }] },
  ];

  ctx.font = '22px "Fira Code", monospace';
  codeLines.forEach((line, idx) => {
    const y = 98 + idx * 31;

    ctx.fillStyle = '#484f58';
    ctx.fillText(line.num, 85, y);

    let x = 145;
    line.tokens.forEach(({ text, col }) => {
      ctx.fillStyle = col;
      ctx.fillText(text, x, y);
      x += ctx.measureText(text).width;
    });
  });

  const termY = 790;
  ctx.fillStyle = '#161b22';
  ctx.fillRect(60, termY, canvas.width - 60, canvas.height - termY);

  ctx.fillStyle = '#e6edf3';
  ctx.font = 'bold 17px monospace';
  ctx.fillText('TERMINAL — zsh (bash)', 90, termY + 30);

  ctx.font = '20px monospace';
  ctx.fillStyle = '#3fb950';
  ctx.fillText('➜  backend-portfolio git:(main) ✗ npm run build', 90, termY + 70);
  ctx.fillStyle = '#79c0ff';
  ctx.fillText('✔ Compiled successfully in 1.2s (Type check: 0 errors)', 90, termY + 110);
  ctx.fillStyle = '#3fb950';
  ctx.fillText('➜  backend-portfolio git:(main) ✗ node dist/server.js', 90, termY + 150);
  ctx.fillStyle = '#7ee787';
  ctx.fillText('[ONLINE] HTTP REST API listening on port 3000 — 100% stable █', 90, termY + 190);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

function createBezelTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1920;
  canvas.height = 1200;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#131315';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const camX = canvas.width / 2;
  const camY = 32;

  ctx.fillStyle = '#1f1f23';
  ctx.beginPath();
  ctx.arc(camX, camY, 12, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#0c1a2d';
  ctx.beginPath();
  ctx.arc(camX, camY, 7, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#4da6ff';
  ctx.beginPath();
  ctx.arc(camX - 2, camY - 2, 2.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#08080a';
  ctx.beginPath();
  ctx.arc(camX - 45, camY, 3, 0, Math.PI * 2);
  ctx.arc(camX + 45, camY, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#222226';
  ctx.beginPath();
  drawRoundRect(ctx, camX + 18, camY - 8, 18, 16, 3);
  ctx.fill();
  ctx.fillStyle = '#e01a22';
  ctx.beginPath();
  ctx.arc(camX + 27, camY, 3.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#dcdce2';
  ctx.font = 'bold 36px "Segoe UI", sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('T14', canvas.width - 55, canvas.height - 35);

  ctx.fillStyle = '#55555a';
  ctx.font = '600 24px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Lenovo', 55, canvas.height - 35);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

function createLidBackTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#161619';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(140, 140);
  ctx.rotate((-37 * Math.PI) / 180);

  ctx.font = 'bold 50px sans-serif';
  ctx.fillStyle = '#e0e0e6';
  ctx.textAlign = 'left';
  ctx.fillText('Think', 0, 0);

  ctx.font = '300 50px sans-serif';
  ctx.fillStyle = '#bfbfc4';
  ctx.fillText('Pad', 130, 0);

  ctx.fillStyle = '#ff1f30';
  ctx.beginPath();
  ctx.arc(94, -38, 7.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  ctx.fillStyle = '#3a3a40';
  ctx.font = 'bold 24px sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('Lenovo', canvas.width - 60, canvas.height - 50);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

export default function ThinkPadT14Model() {
  const keyboardTexture = useMemo(() => createKeyboardTexture(), []);
  const screenTexture = useMemo(() => createScreenTexture(), []);
  const bezelTexture = useMemo(() => createBezelTexture(), []);
  const lidBackTexture = useMemo(() => createLidBackTexture(), []);

  const baseW = 3.29;
  const baseD = 2.27;
  const baseH = 0.11;
  const lidH = 0.075;

  return (
    <group position={[0, 0, 0]}>
      <group position={[0, 0, 0]}>
        <mesh position={[0, -baseH / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[baseW, baseH, baseD]} />
          <meshStandardMaterial
            color="#161619"
            roughness={0.78}
            metalness={0.18}
          />
        </mesh>

        <mesh position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[baseW, baseD]} />
          <meshStandardMaterial
            map={keyboardTexture}
            roughness={0.76}
            metalness={0.16}
          />
        </mesh>

        <mesh position={[0, 0.022, -0.348]} castShadow>
          <cylinderGeometry args={[0.042, 0.038, 0.032, 24]} />
          <meshStandardMaterial
            color="#e01a22"
            emissive="#55050a"
            emissiveIntensity={0.4}
            roughness={0.4}
            metalness={0.05}
          />
        </mesh>

        <mesh position={[-baseW / 2 + 0.002, -baseH / 2, -0.2]}>
          <boxGeometry args={[0.015, 0.032, 0.65]} />
          <meshBasicMaterial color="#0a0a0c" />
        </mesh>

        <mesh position={[baseW / 2 - 0.002, -baseH / 2, -0.15]}>
          <boxGeometry args={[0.015, 0.038, 0.45]} />
          <meshBasicMaterial color="#0a0a0c" />
        </mesh>

        {[
          [-baseW * 0.42, -baseH - 0.005, -baseD * 0.4],
          [baseW * 0.42, -baseH - 0.005, -baseD * 0.4],
          [-baseW * 0.42, -baseH - 0.005, baseD * 0.4],
          [baseW * 0.42, -baseH - 0.005, baseD * 0.4],
        ].map(([fx, fy, fz], idx) => (
          <mesh key={idx} position={[fx, fy, fz]}>
            <cylinderGeometry args={[0.05, 0.05, 0.015, 16]} />
            <meshBasicMaterial color="#080809" />
          </mesh>
        ))}
      </group>

      <mesh position={[-baseW * 0.36, 0.02, -baseD / 2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.038, 0.038, 0.22, 20]} />
        <meshStandardMaterial color="#424246" roughness={0.25} metalness={0.85} />
      </mesh>
      <mesh position={[baseW * 0.36, 0.02, -baseD / 2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.038, 0.038, 0.22, 20]} />
        <meshStandardMaterial color="#424246" roughness={0.25} metalness={0.85} />
      </mesh>

      <group position={[0, 0.02, -baseD / 2]} rotation={[-0.38, 0, 0]}>
        <mesh position={[0, baseD / 2, -lidH / 2]} castShadow>
          <boxGeometry args={[baseW, baseD, lidH]} />
          <meshStandardMaterial
            map={lidBackTexture}
            color="#161619"
            roughness={0.78}
            metalness={0.18}
          />
        </mesh>

        <mesh position={[0, baseD / 2, 0.002]}>
          <planeGeometry args={[baseW, baseD]} />
          <meshStandardMaterial
            map={bezelTexture}
            roughness={0.84}
            metalness={0.15}
          />
        </mesh>

        <mesh position={[0, baseD * 0.52, 0.004]}>
          <planeGeometry args={[3.06, 1.76]} />
          <meshStandardMaterial
            map={screenTexture}
            roughness={0.15}
            metalness={0.05}
            emissive="#141c2b"
            emissiveIntensity={0.85}
          />
        </mesh>
      </group>
    </group>
  );
}
