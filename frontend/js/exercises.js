const exerciseData = {
  chest: {
    emoji: '🫁', title: 'Chest Exercises',
    exercises: [
      {
        name: 'Push-Ups', sets: '3 sets', reps: '15 reps', rest: '45 sec', level: 'Beginner',
        goal: 'All goals', calories: '60 kcal/set',
        steps: ['Lie face down, hands shoulder-width apart.', 'Keep body straight from head to heels.', 'Lower chest to floor, elbows at 45°.', 'Push back up explosively.', 'Keep core tight throughout — do not sag hips.']
      },
      {
        name: 'Incline Push-Ups', sets: '3 sets', reps: '12 reps', rest: '45 sec', level: 'Beginner',
        goal: 'Weight Loss', calories: '50 kcal/set',
        steps: ['Place hands on an elevated surface (chair/bench).', 'Walk feet back until body is straight.', 'Lower chest toward the surface.', 'Push back up to starting position.', 'Easier than regular push-up — great for beginners.']
      },
      {
        name: 'Chest Dips', sets: '3 sets', reps: '10 reps', rest: '60 sec', level: 'Intermediate',
        goal: 'Weight Gain', calories: '80 kcal/set',
        steps: ['Hold parallel bars, arms fully extended.', 'Lean forward slightly to target chest.', 'Bend elbows and lower body.', 'Go until shoulders dip below elbows.', 'Push back up to starting position.']
      }
    ]
  },
  arms: {
    emoji: '💪', title: 'Arm Exercises',
    exercises: [
      {
        name: 'Bicep Curls', sets: '3 sets', reps: '12 reps', rest: '45 sec', level: 'Beginner',
        goal: 'Weight Gain', calories: '40 kcal/set',
        steps: ['Stand with dumbbells in each hand, palms forward.', 'Keep elbows tucked at your sides.', 'Curl both weights up to shoulder level.', 'Squeeze bicep at the top.', 'Lower slowly — take 3 seconds down.']
      },
      {
        name: 'Tricep Dips (Chair)', sets: '3 sets', reps: '12 reps', rest: '45 sec', level: 'Beginner',
        goal: 'All goals', calories: '50 kcal/set',
        steps: ['Sit on edge of chair, hands gripping seat.', 'Slide hips off chair, legs extended.', 'Bend elbows to lower body toward floor.', 'Go until upper arms are parallel to floor.', 'Push back up through palms. Keep elbows close.']
      },
      {
        name: 'Diamond Push-Ups', sets: '3 sets', reps: '10 reps', rest: '60 sec', level: 'Intermediate',
        goal: 'Weight Loss', calories: '65 kcal/set',
        steps: ['Get into push-up position.', 'Place hands together forming a diamond shape.', 'Lower chest toward hands.', 'Elbows flare outward slightly.', 'Push back up. This targets triceps heavily.']
      }
    ]
  },
  legs: {
    emoji: '🦵', title: 'Leg Exercises',
    exercises: [
      {
        name: 'Squats', sets: '4 sets', reps: '15 reps', rest: '60 sec', level: 'Beginner',
        goal: 'All goals', calories: '90 kcal/set',
        steps: ['Stand feet shoulder-width apart, toes slightly out.', 'Engage core, chest up, back straight.', 'Push hips back and bend knees downward.', 'Lower until thighs are parallel to floor.', 'Drive through heels to stand back up.']
      },
      {
        name: 'Lunges', sets: '3 sets', reps: '12 reps each leg', rest: '45 sec', level: 'Beginner',
        goal: 'Weight Loss', calories: '70 kcal/set',
        steps: ['Stand tall with feet together.', 'Step one foot forward about 2 feet.', 'Lower back knee toward the ground.', 'Front thigh should be parallel to floor.', 'Push back to start, alternate legs.']
      },
      {
        name: 'Wall Sit', sets: '3 sets', reps: '30–60 sec hold', rest: '45 sec', level: 'Beginner',
        goal: 'Maintain Weight', calories: '40 kcal/set',
        steps: ['Stand with back flat against a wall.', 'Slide down until thighs are parallel to floor.', 'Knees directly above ankles — not over toes.', 'Hold position, arms relaxed at sides.', 'Feel the burn in quads — hold as long as you can.']
      },
      {
        name: 'Calf Raises', sets: '3 sets', reps: '20 reps', rest: '30 sec', level: 'Beginner',
        goal: 'All goals', calories: '30 kcal/set',
        steps: ['Stand near wall for balance support.', 'Feet hip-width apart.', 'Rise onto toes as high as possible.', 'Hold 1 second at the top.', 'Lower slowly back down. Feel the stretch.']
      }
    ]
  },
  back: {
    emoji: '🔙', title: 'Back Exercises',
    exercises: [
      {
        name: 'Superman Hold', sets: '3 sets', reps: '12 reps', rest: '45 sec', level: 'Beginner',
        goal: 'Maintain Weight', calories: '35 kcal/set',
        steps: ['Lie face down on mat, arms extended forward.', 'Simultaneously lift arms, chest and legs off floor.', 'Hold position for 2–3 seconds.', 'Lower back down slowly.', 'Feel contraction in lower back and glutes.']
      },
      {
        name: 'Reverse Snow Angels', sets: '3 sets', reps: '15 reps', rest: '45 sec', level: 'Beginner',
        goal: 'All goals', calories: '30 kcal/set',
        steps: ['Lie face down, arms by sides.', 'Raise arms off floor keeping them straight.', 'Sweep arms up toward head like a snow angel.', 'Keep arms raised throughout movement.', 'Strengthens mid and upper back.']
      },
      {
        name: 'Pull-Ups', sets: '3 sets', reps: '6–10 reps', rest: '90 sec', level: 'Advanced',
        goal: 'Weight Gain', calories: '100 kcal/set',
        steps: ['Grip bar slightly wider than shoulder-width.', 'Hang with arms fully extended.', 'Engage core — no swinging.', 'Pull up until chin clears the bar.', 'Lower slowly and controlled. Repeat.']
      }
    ]
  },
  shoulders: {
    emoji: '🤷', title: 'Shoulder Exercises',
    exercises: [
      {
        name: 'Shoulder Press', sets: '3 sets', reps: '12 reps', rest: '60 sec', level: 'Beginner',
        goal: 'Weight Gain', calories: '55 kcal/set',
        steps: ['Hold weights at shoulder height, palms forward.', 'Keep core tight, back straight.', 'Press weights overhead until arms are straight.', 'Hold 1 second at the top.', 'Lower slowly back to shoulder height.']
      },
      {
        name: 'Lateral Raises', sets: '3 sets', reps: '15 reps', rest: '45 sec', level: 'Beginner',
        goal: 'Weight Loss', calories: '40 kcal/set',
        steps: ['Stand with dumbbells at sides.', 'Keep slight bend in elbows.', 'Raise both arms out to sides to shoulder height.', 'Pause 1 second at top.', 'Lower slowly — resist gravity on the way down.']
      },
      {
        name: 'Wall Angels', sets: '3 sets', reps: '12 reps', rest: '30 sec', level: 'Beginner',
        goal: 'Maintain Weight', calories: '25 kcal/set',
        steps: ['Stand back flat against wall, feet 6 inches out.', 'Arms bent at 90°, pressed to wall.', 'Slowly raise arms overhead, keeping contact with wall.', 'Return to starting position.', 'Improves posture and shoulder mobility.']
      }
    ]
  },
  abs: {
    emoji: '🫃', title: 'Abs / Core Exercises',
    exercises: [
      {
        name: 'Plank', sets: '3 sets', reps: '30–60 sec hold', rest: '45 sec', level: 'Beginner',
        goal: 'All goals', calories: '50 kcal/set',
        steps: ['Get into push-up position on forearms.', 'Body forms straight line head to heels.', 'Engage core — pull navel toward spine.', 'Keep glutes squeezed, breathe normally.', 'Do not let hips sag or rise. Hold steady.']
      },
      {
        name: 'Crunches', sets: '3 sets', reps: '20 reps', rest: '30 sec', level: 'Beginner',
        goal: 'Weight Loss', calories: '35 kcal/set',
        steps: ['Lie on back, knees bent, feet flat on floor.', 'Place hands behind head lightly.', 'Engage core and curl shoulders off floor.', 'Lift only shoulder blades — not full sit-up.', 'Lower slowly. Do not pull on neck.']
      },
      {
        name: 'Bicycle Crunches', sets: '3 sets', reps: '20 reps', rest: '45 sec', level: 'Intermediate',
        goal: 'Weight Loss', calories: '55 kcal/set',
        steps: ['Lie on back, hands behind head.', 'Lift shoulders and bring knees to 90°.', 'Bring right elbow to left knee, extend right leg.', 'Switch sides in a cycling motion.', 'Keep core engaged and movement controlled.']
      },
      {
        name: 'Leg Raises', sets: '3 sets', reps: '15 reps', rest: '45 sec', level: 'Intermediate',
        goal: 'Maintain Weight', calories: '45 kcal/set',
        steps: ['Lie flat on back, hands under hips.', 'Keep legs straight and together.', 'Raise legs to 90° from the floor.', 'Lower slowly — stop just above floor.', 'Do not let lower back arch. Keep it pressed down.']
      }
    ]
  },
  cardio: {
    emoji: '🏃', title: 'Cardio Exercises',
    exercises: [
      {
        name: 'Jumping Jacks', sets: '3 sets', reps: '30 reps', rest: '30 sec', level: 'Beginner',
        goal: 'Weight Loss', calories: '70 kcal/set',
        steps: ['Stand with feet together, arms at sides.', 'Jump feet apart and raise arms overhead.', 'Jump feet back together, arms down.', 'Keep a steady rhythm — not too fast.', 'Great warm-up or standalone cardio burst.']
      },
      {
        name: 'High Knees', sets: '3 sets', reps: '30 sec', rest: '30 sec', level: 'Beginner',
        goal: 'Weight Loss', calories: '80 kcal/set',
        steps: ['Stand tall with feet hip-width.', 'Run in place lifting knees to hip height.', 'Pump arms in rhythm with knees.', 'Land softly on balls of feet.', 'Keep up a fast pace for best cardio benefit.']
      },
      {
        name: 'Burpees', sets: '3 sets', reps: '10 reps', rest: '60 sec', level: 'Intermediate',
        goal: 'Weight Loss', calories: '120 kcal/set',
        steps: ['Stand feet shoulder-width apart.', 'Jump feet back into plank position.', 'Perform a push-up (optional).', 'Jump feet back toward hands.', 'Explode upward, jump and clap overhead.']
      },
      {
        name: 'Jump Rope (Skipping)', sets: '3 sets', reps: '60 sec', rest: '30 sec', level: 'Beginner',
        goal: 'Weight Loss', calories: '110 kcal/set',
        steps: ['Hold rope ends, stand with feet together.', 'Swing rope overhead and jump as it passes.', 'Land softly on balls of feet.', 'Keep jumps small — just enough to clear rope.', 'Increase speed as you improve.']
      }
    ]
  },
  fullbody: {
    emoji: '🧍', title: 'Full Body Exercises',
    exercises: [
      {
        name: 'Mountain Climbers', sets: '3 sets', reps: '20 reps', rest: '45 sec', level: 'Intermediate',
        goal: 'Weight Loss', calories: '95 kcal/set',
        steps: ['Start in push-up (high plank) position.', 'Drive right knee toward chest quickly.', 'Return it, then drive left knee.', 'Alternate at a running pace.', 'Keep hips low and core tight throughout.']
      },
      {
        name: 'Deadlift (Bodyweight)', sets: '3 sets', reps: '12 reps', rest: '60 sec', level: 'Beginner',
        goal: 'Weight Gain', calories: '80 kcal/set',
        steps: ['Stand with feet hip-width, knees soft.', 'Hinge forward from hips, back flat.', 'Lower hands down legs toward floor.', 'Feel stretch in hamstrings.', 'Drive hips forward to stand tall again.']
      },
      {
        name: 'Bear Crawl', sets: '3 sets', reps: '20 meters', rest: '45 sec', level: 'Intermediate',
        goal: 'All goals', calories: '75 kcal/set',
        steps: ['Get on all fours, knees hovering 2 inches off floor.', 'Move right hand and left foot forward.', 'Then left hand and right foot forward.', 'Keep back flat and core engaged.', 'Move in controlled, deliberate steps.']
      }
    ]
  }
};

function showExercises(part) {
  const data = exerciseData[part];
  if (!data) return;

  document.getElementById('bodyGrid').classList.add('hidden');
  const panel = document.getElementById('exercisePanel');
  panel.classList.remove('hidden');

  document.getElementById('exPanelEmoji').textContent = data.emoji;
  document.getElementById('exPanelTag').textContent = `${data.exercises.length} Exercises`;
  document.getElementById('exPanelTitle').textContent = data.title;

  document.getElementById('exerciseList').innerHTML = data.exercises.map(ex => `
    <div class="ex-card">
      <div class="ex-card-header">
        <span class="ex-name">${data.emoji} ${ex.name}</span>
        <div class="ex-tags">
          <span class="ex-tag"><i class="fas fa-signal"></i> ${ex.level}</span>
          <span class="ex-tag"><i class="fas fa-bullseye"></i> ${ex.goal}</span>
          <span class="ex-tag"><i class="fas fa-fire"></i> ${ex.calories}</span>
        </div>
      </div>
      <div class="ex-card-body">
        <div class="ex-two-col">
          <div>
            <p class="ex-section-title"><i class="fas fa-shoe-prints"></i> How To Do It</p>
            <ol class="ex-steps">
              ${ex.steps.map((s, i) => `
                <li>
                  <span class="step-num">${i+1}</span>
                  <span>${s}</span>
                </li>`).join('')}
            </ol>
          </div>
          <div>
            <p class="ex-section-title"><i class="fas fa-sliders"></i> Details</p>
            <ul class="ex-details">
              <li><span class="ed-label">Sets</span><span class="ed-val">${ex.sets}</span></li>
              <li><span class="ed-label">Reps</span><span class="ed-val">${ex.reps}</span></li>
              <li><span class="ed-label">Rest</span><span class="ed-val">${ex.rest}</span></li>
              <li><span class="ed-label">Level</span><span class="ed-val">${ex.level}</span></li>
              <li><span class="ed-label">Calories Burned</span><span class="ed-val">${ex.calories}</span></li>
            </ul>
            <div class="ex-goal-badge">
              <i class="fas fa-bullseye"></i> Best for: ${ex.goal}
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function backToBodyGrid() {
  document.getElementById('exercisePanel').classList.add('hidden');
  document.getElementById('bodyGrid').classList.remove('hidden');
}
