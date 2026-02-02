import { useEffect, useRef } from 'react';

export default function StarField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const stars: { x: number; y: number; size: number; speed: number; opacity: number; fadeSpeed: number }[] = [];
        const shootingStars: { x: number; y: number; length: number; speed: number; angle: number; opacity: number }[] = [];

        // Initialize stars
        const initStars = () => {
            const starCount = Math.floor((width * height) / 3000); // Dense stars
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 1.5,
                    speed: Math.random() * 0.2,
                    opacity: Math.random(),
                    fadeSpeed: (Math.random() * 0.02) + 0.005
                });
            }
        };

        const createShootingStar = () => {
            shootingStars.push({
                x: Math.random() * width,
                y: Math.random() * (height / 2),
                length: Math.random() * 80 + 20,
                speed: Math.random() * 10 + 5,
                angle: Math.PI / 4, // 45 degrees
                opacity: 1
            });
        };

        initStars();

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw regular stars
            stars.forEach(star => {
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();

                // Twinkle effect
                star.opacity += star.fadeSpeed;
                if (star.opacity > 1 || star.opacity < 0.2) {
                    star.fadeSpeed = -star.fadeSpeed;
                }

                // Subtle movement
                star.y -= star.speed;
                if (star.y < 0) {
                    star.y = height;
                    star.x = Math.random() * width;
                }
            });

            // Draw shooting stars
            for (let i = shootingStars.length - 1; i >= 0; i--) {
                const s = shootingStars[i];

                const endX = s.x + Math.cos(s.angle) * s.length;
                const endY = s.y + Math.sin(s.angle) * s.length;

                const gradient = ctx.createLinearGradient(s.x, s.y, endX, endY);
                gradient.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`);
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(endX, endY);
                ctx.stroke();

                // Move
                s.x += Math.cos(s.angle) * s.speed;
                s.y += Math.sin(s.angle) * s.speed;
                s.opacity -= 0.02;

                if (s.opacity <= 0) {
                    shootingStars.splice(i, 1);
                }
            }

            // Randomly spawn shooting stars
            if (Math.random() < 0.015) { // Adjust frequency
                createShootingStar();
            }

            requestAnimationFrame(animate);
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            stars.length = 0;
            initStars();
        };

        animate();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none'
            }}
        />
    );
}
