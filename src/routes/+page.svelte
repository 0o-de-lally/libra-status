<script lang="ts">
	import { refreshValidator } from "$lib";
	import type { ReportValidator } from "libra-reports/src/reports/validators";
	import { onMount } from "svelte";

  let isReady = false
  let rv: ReportValidator;
  onMount(async () => {
    rv = await refreshValidator()
    isReady = true
  })

</script>

<body>
  {#if isReady}
    <table>
      <tr>
        <th>handle</th>
        <th>address</th>
        <th>bid</th>
      </tr>
        {#each rv.profiles.entries() as [k, v]}
          <tr>
            <td>{v.handle}</td>
            <td>{k.slice(2,6)}</td>
            <td>{v.bid_value}</td>
          </tr>
        {/each}
      </table>
  {:else}
      ... living is waiting ...
  {/if}


</body>
