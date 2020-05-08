<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <!-- Render "SMASH TRAINING" as a title with bigger letters on the outside
            than the inside, and with a curved underline below it. -->
            <h1 class="header hidden-md-and-down">
              <!-- Apparently there's no way to do a warp
              transform in CSS, so we approximate it by manually setting the size
              of all the letters.

              We're careful to set `aria-label` since screenreaders may not be able
              to read the title. Firefox's accessibility tools thought this was
              rendered as "SMASHTRAINING".

              1) The text is all uppercase because of the `text-transform:
              uppercase` setting, I guess. (That's kind of strange to me: I would
              expect that CSS directive to be used strictly for styling, and that
              screenreaders would ignore it.)
              2) The space was dropped, I assume because it was in an element by
              itself.
              -->
              <span class="header-text" aria-label="Smash Training">
                <span class="word">
                  <span class="letter-1">S</span><span class="letter-2">m</span
                  ><span class="letter-3">a</span><span class="letter-3">s</span
                  ><span class="letter-3">h</span>
                </span>
                <span class="letter-space">&nbsp;</span>
                <span class="word">
                  <span class="letter-3">Tra</span
                  ><span class="letter-3">i</span><span class="letter-3">n</span
                  ><span class="letter-3">i</span><span class="letter-2">n</span
                  ><span class="letter-1">g</span>
                </span>
              </span>

              <br />

              <!-- We use the following element to draw a curved underline using a
              border with the `border-radius` setting. We can't directly apply the
              border to the previous element with the actual text, because the
              border will curve outward instead of inwards.

              Instead, we render a border on the element immediately below. To
              ensure that the border is the correct length, we render a copy of the
              text above, but hide it. Keep this in sync with the text above, being
              sure to use the `underline-inner` class to hide the contents. -->
              <span class="header-text underline">
                <span class="underline-inner">
                  <span class="word">
                    <span class="letter-1">S</span
                    ><span class="letter-2">m</span
                    ><span class="letter-3">a</span
                    ><span class="letter-3">s</span
                    ><span class="letter-3">h</span>
                  </span>
                  <span class="letter-space">&nbsp;</span>
                  <span class="word">
                    <span class="letter-3">Tra</span
                    ><span class="letter-3">i</span
                    ><span class="letter-3">n</span
                    ><span class="letter-3">i</span
                    ><span class="letter-2">n</span
                    ><span class="letter-1">g</span>
                  </span>
                </span>
              </span>
            </h1>

            <!-- Do the same thing as above, but since "SMASH" and "TRAINING" are
            broken onto different lines, only render the effect for the word
            "TRAINING". -->
            <h1 class="header hidden-lg-and-up">
              <span class="header-text" aria-label="Smash Training">
                <span class="word">
                  <span class="letter-3">Smash</span>
                </span>
                <br />
                <span class="word word-smaller">
                  <span class="letter-3">Training</span>
                </span>
              </span>

              <br />

              <!-- Only include the word "training" here. -->
              <span class="header-text underline">
                <span class="underline-inner">
                  <span class="word word-smaller">
                    <span class="letter-3">Training</span>
                  </span>
                </span>
              </span>
            </h1>

            <b>Smash Training</b> is a
            <a href="https://en.wikipedia.org/wiki/Spaced_repetition"
              >spaced repetition</a
            >
            trainer for Super Smash Bros. Ultimate techniques. How it works:

            <ol>
              <li>
                <b>Smash Training</b> provides a set of drills to do based on
                your current skill level.
              </li>
              <li>
                You complete drills and record how well you did.
                <b>Smash Training</b> uses a spaced-repetition algorithm to
                updates its model of exercises you should improve.
              </li>
              <li>
                You rest for a day or two, then return for more training.
              </li>
            </ol>

            No login necessary. Your data is stored on your device.
          </v-card-text>
          <v-card-actions>
            <v-container>
              <v-row>
                <CharacterSelector gameId="ssbu" />
              </v-row>
              <v-row>
                <v-btn :to="{ name: 'training' }" block color="primary"
                  >Start training</v-btn
                >
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Deliberate practice</v-card-title>
          <v-card-text>
            <p>
              <a
                href="https://en.wikipedia.org/wiki/Practice_(learning_method)#Deliberate_practice"
                >Deliberate practice</a
              >
              is the best way to improve your skills in any given domain. The
              key idea is to seriously focus on practicing techniques at the
              boundary of your comfort zone. Ten minutes of deliberate practice
              beats an hour of mindless repetitions. This training system only
              works if you practice deliberately.
            </p>

            I recommend
            <a
              href="https://www.amazon.com/Little-Book-Talent-Improving-Skills/dp/034553025X"
              >The Little Book of Talent</a
            >
            to learn more about concrete deliberate practice techniques.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Strategic vs. technical skill</v-card-title>
          <v-card-text>
            <p>
              <b>Smash Training</b> can teach you technical skills like spacing
              aerial attacks, but it can't teach you strategic skills like
              deciding which moves to use in a given situation. That's because
              it's easier to automatically generate and assess technical drills.
            </p>

            Nonetheless, having strong technical skills is a prerequisite for
            being a strong player. You won't be able to execute your strategy if
            you don't hone your technical skills first.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.header {
  color: black;
  text-align: center;
  line-height: unset;
  font-family: Georgia, serif;
  line-height: 1.5em;
  text-transform: uppercase;
}

.header-text {
  display: inline-block;
}

.underline {
  margin-top: 5px;
  border-top: solid black 3px;
  /* From https://stackoverflow.com/a/41609487/344643 */
  border-radius: 100%/30px 30px 0px 0px;
  color: white;
}

.underline-inner {
  visibility: hidden;
}

.word {
  white-space: nowrap;
}

.letter-1 {
  display: inline-block;
  margin-top: 0.2rem;
  vertical-align: text-top;
  font-size: 4rem;
}

.word-smaller .letter-1 {
  font-size: 3.7rem;
}

.letter-2 {
  display: inline-block;
  margin-top: 0.1rem;
  vertical-align: text-top;
  font-size: 3.7rem;
}

.word-smaller .letter-2 {
  font-size: 3.4rem;
}

.letter-3 {
  vertical-align: text-top;
  font-size: 3.4rem;
}

.word-smaller .letter-3 {
  font-size: 3.1rem;
}

.letter-space {
  display: inline-block;
  vertical-align: text-top;
  width: 1rem;
}
</style>

<script lang="ts">
import CharacterSelector from "@/components/training/CharacterSelector.vue";
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "home",
  components: { CharacterSelector },
})
export default class extends Vue {}
</script>
