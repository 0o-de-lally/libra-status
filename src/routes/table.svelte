<script lang="ts">
	import Row from './row.svelte';
	import { refreshValidator } from '$lib';
	import type { ReportValidator } from 'libra-reports/src/reports/validators';
	import { onMount } from 'svelte';
	import { validatorDB } from '$lib/persist';

  let loading = false;
	let isReady = false;
	let rv: ReportValidator;

	validatorDB.subscribe(() => {
		isReady = true;
	});

	onMount(async () => {
    loading = true;
		rv = await refreshValidator();
		const sorted = rv.toSortedArray('bid_value').reverse();
		validatorDB.set(sorted);
		loading = false;
	});
</script>

<body>
  {#if loading }
		refreshing. living is waiting ...
	{/if}

	{#if isReady && $validatorDB.length > 0}
		<table>
			<tr style="text-align: left;">
				<th>handle</th>
				<th>address</th>
				<th>bid</th>
				<th>warning</th>
				<th>vouchers in set (excludes family)</th>
				<th>all received (includes family)</th>
				<th>vouches given</th>
			</tr>

			<tr><b>SEATED {$validatorDB.filter((e) => e.in_val_set).length} </b></tr>
			{#each $validatorDB as v}
				{#if v.in_val_set}
					<Row {v} />
				{/if}
			{/each}
			<p><b>BIDDING</b></p>
			{#each $validatorDB as v}
				{#if !v.in_val_set && v.qualification_errors.length == 0}
					<Row {v} />
				{/if}
			{/each}

			<p><b>INELIGIBLE</b></p>
			{#each $validatorDB as v}
				{#if v.qualification_errors.length > 0}
					<Row {v} />
				{/if}
			{/each}
		</table>
    {/if}
</body>
