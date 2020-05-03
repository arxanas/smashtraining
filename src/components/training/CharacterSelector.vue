<template>
  <v-autocomplete
    label="Choose a character"
    clearable
    :items="characters"
    itemText=".characterMetadata.displayName"
    itemValue=".characterId"
    :filter="filter"
    @change="onChange"
    :value="selectedCharacterId"
  >
    <template v-slot:selection="data">
      <v-chip>
        <v-avatar left tile size="24" style="margin-right: 5px">
          <img :src="getUrlForHeadIcon(data.item)" />
        </v-avatar>
        {{ data.item.characterMetadata.displayName }}
      </v-chip>
    </template>
    <template v-slot:item="data">
      <v-list-item-avatar tile size="24" class="pa-0">
        <v-img :src="getUrlForHeadIcon(data.item)" />
      </v-list-item-avatar>
      <v-list-item-content class="pa-0">
        <v-list-item-title>
          {{ data.item.characterMetadata.displayName }}
        </v-list-item-title>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import {
  commitSelectCharacter,
  commitUnselectCharacter,
  dispatchSaveState,
  readSelectedCharacters,
} from "../../store";
import {
  allCharacterMetadata,
  CharacterId,
  CharacterMetadata,
  GameId,
} from "../../tech/AllCharacterMetadata";

interface AutocompleteItem {
  characterId: string;
  characterMetadata: CharacterMetadata;
}

@Component({ name: "CharacterSelector" })
export default class extends Vue {
  @Prop({ type: String, required: true })
  public gameId!: GameId;

  get characters(): AutocompleteItem[] {
    return Object.entries(allCharacterMetadata[this.gameId])
      .map(entry => {
        const [characterId, characterMetadata] = entry;
        return {
          characterId,
          characterMetadata,
        };
      })
      .sort((lhs, rhs) => {
        return lhs.characterMetadata.displayName <
          rhs.characterMetadata.displayName
          ? -1
          : 1;
      });
  }

  get selectedCharacterId() {
    const selectedCharacters = readSelectedCharacters(this.$store);
    return selectedCharacters[this.gameId];
  }

  public async onChange(
    characterId: CharacterId<GameId> | undefined,
  ): Promise<void> {
    if (characterId !== undefined) {
      commitSelectCharacter(this.$store, {
        gameId: this.gameId,
        characterId,
      });
    } else {
      commitUnselectCharacter(this.$store, this.gameId);
    }
    await dispatchSaveState(this.$store);
  }

  public filter(
    item: AutocompleteItem,
    queryText: string,
    itemText: string,
  ): boolean {
    return (
      this.normalizeText(item.characterMetadata.displayName).indexOf(
        this.normalizeText(queryText),
      ) !== -1
    );
  }

  private getUrlForHeadIcon(item: AutocompleteItem): string {
    const { characterId } = item;
    return `/head-icons/${characterId}.png`;
  }

  private normalizeText(text: string): string {
    return (
      text
        // For characters like Mr. Game & Watch
        .replace(/&/g, "and")
        // For characters like R.O.B.
        .replace(/\./g, "")
        .toLocaleLowerCase()
    );
  }
}
</script>
